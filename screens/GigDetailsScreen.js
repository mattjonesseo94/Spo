import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GigDetailsScreen = ({ route, navigation }) => {
  const { artistName } = route.params;
  const [gigs, setGigs] = useState([]);
  const [attendingGigs, setAttendingGigs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saveAttendance = async () => {
      try {
        await AsyncStorage.setItem('attendingGigs', JSON.stringify(Array.from(attendingGigs)));
      } catch (e) {
        console.error("Failed to save attendance:", e);
      }
    };

    saveAttendance();
  }, [attendingGigs]);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const savedAttendingGigs = await AsyncStorage.getItem('attendingGigs');
        if (savedAttendingGigs !== null) {
          setAttendingGigs(new Set(JSON.parse(savedAttendingGigs)));
        }
      } catch (e) {
        console.error("Failed to load attendance:", e);
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
            apikey: 'LZqHgCDf5jG2KZnMI0jzijcTra4fxedW',
            keyword: artistName,
            classificationName: 'music',
            countryCode: 'GB',
          }
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

  const toggleAttending = (gigId) => {
    setAttendingGigs(prev => {
      const newAttending = new Set(prev);
      if (newAttending.has(gigId)) {
        newAttending.delete(gigId);
      } else {
        newAttending.add(gigId);
      }
      return newAttending;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{artistName}'s Upcoming Gigs</Text>
      {isLoading ? <Text>Loading...</Text> : (
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
              <Text>Venue: {item._embedded?.venues[0].name}</Text>
              <Text>Date: {item.dates.start.localDate}</Text>
              <TouchableOpacity onPress={() => toggleAttending(item.id)} style={styles.attendButton}>
                <Text style={styles.attendButtonText}>
                  {attendingGigs.has(item.id) ? '✓ Attending' : '☆ Mark as Attending'}
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
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gigDetails: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    marginBottom: 10,
  },
  bandName: {
    backgroundColor: "#ddd",
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  attendButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
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
