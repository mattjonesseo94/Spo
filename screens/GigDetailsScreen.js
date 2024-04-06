import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GigDetailsScreen = ({ route, navigation }) => {
  const { artistName } = route.params;
  const [gigs, setGigs] = useState([]);
  const [attendingGigs, setAttendingGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const savedAttendingGigs = await AsyncStorage.getItem('attendingGigs');
        setAttendingGigs(savedAttendingGigs ? JSON.parse(savedAttendingGigs) : []);
      } catch (e) {
        console.error("Failed to load attending gigs:", e);
      }
    };

    loadAttendance();
  }, []);

  useEffect(() => {
    const fetchGigs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
          params: {
            apikey: 'LZqHgCDf5jG2KZnMI0jzijcTra4fxedW', // Use your Ticketmaster API key
            keyword: artistName,
            classificationName: 'music',
            countryCode: 'GB',
          },
        });
        setGigs(response.data._embedded?.events || []);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();
  }, [artistName]);

  const toggleAttending = async (selectedGig) => {
    const isAlreadyAttending = attendingGigs.some(gig => gig.id === selectedGig.id);
    const updatedAttendingGigs = isAlreadyAttending ? attendingGigs.filter(gig => gig.id !== selectedGig.id) : [...attendingGigs, {
      id: selectedGig.id,
      name: selectedGig.name,
      image: selectedGig.images[0].url,
      venue: selectedGig._embedded.venues[0].name,
      date: selectedGig.dates.start.localDate,
      bands: selectedGig._embedded?.attractions?.map(attraction => attraction.name) || [],
    }];

    try {
      await AsyncStorage.setItem('attendingGigs', JSON.stringify(updatedAttendingGigs));
      setAttendingGigs(updatedAttendingGigs);
    } catch (e) {
      console.error("Error saving attending gigs:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{artistName}'s Upcoming Gigs</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={gigs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.gigDetails}>
              <Image source={{ uri: item.images[0].url }} style={styles.eventImage} />
              <Text style={styles.gigName}>{item.name}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item._embedded?.attractions.map((band, index) => (
                  <Text key={index} style={styles.bandName}>{band.name}</Text>
                ))}
              </ScrollView>
              <Text style={styles.details}>Venue: {item._embedded?.venues[0].name}</Text>
              <Text style={styles.details}>Date: {item.dates.start.localDate}</Text>
              <TouchableOpacity onPress={() => toggleAttending(item)} style={styles.attendButton}>
                <Text style={styles.attendButtonText}>
                  {attendingGigs.some(gig => gig.id === item.id) ? '✓ Attending' : '☆ Mark as Attending'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  gigDetails: {
    marginBottom: 20,
    padding: 10,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  gigName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  bandName: {
    marginRight: 10,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  attendButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  attendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GigDetailsScreen;
