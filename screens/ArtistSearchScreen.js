import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import debounce from 'lodash.debounce';

const ArtistEventsPage = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);

  const fetchEvents = debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setEvents([]);
      return;
    }
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=LZqHgCDf5jG2KZnMI0jzijcTra4fxedW&keyword=${encodeURIComponent(searchQuery)}&classificationName=music&countryCode=GB`);
      let eventsData = response.data._embedded?.events || [];

      const filteredEvents = [];
      const artistNames = new Set();
      eventsData.forEach(event => {
        const artist = event._embedded?.attractions?.[0];
        if (artist && artist.name.toLowerCase().includes(searchQuery.toLowerCase()) && !artistNames.has(artist.name)) {
          artistNames.add(artist.name);
          const imageUrl = event.images?.[0]?.url;
          filteredEvents.push({ ...event, imageUrl, artistName: artist.name });
        }
      });

      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    }
  }, 500);

  useEffect(() => {
    fetchEvents(query);
    return () => fetchEvents.cancel();
  }, [query]);

  const navigateToGigDetails = (artistName) => {
    navigation.navigate('GigDetailsScreen', { artistName });
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for an artist..."
        onChangeText={setQuery}
        value={query}
      />
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToGigDetails(item.artistName)}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
            )}
            <Text style={styles.artistName}>{item.artistName || 'Artist Name Not Available'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  artistName: {
    fontSize: 16,
  },
});

export default ArtistEventsPage;
