import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyGigsScreen = () => {
  const [attendedGigs, setAttendedGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAttendedGigs = async () => {
      setIsLoading(true);
      try {
        const savedAttendedGigs = await AsyncStorage.getItem('attendingGigs');
        if (savedAttendedGigs !== null) {
          const filteredGigs = JSON.parse(savedAttendedGigs).filter(gig => gig.bands && gig.bands.length > 0);
          setAttendedGigs(filteredGigs);
        }
      } catch (e) {
        console.error("Failed to load attended gigs:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttendedGigs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Upcoming Gigs</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : attendedGigs.length > 0 ? (
        <FlatList
          data={attendedGigs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.gigDetails}>
              <Image source={{ uri: item.image }} style={styles.eventImage} />
              <Text style={styles.gigName}>{item.name}</Text>
              <Text style={styles.details}>Date: {item.date}</Text>
              <Text style={styles.details}>Venue: {item.venue}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.bandsContainer}
                contentContainerStyle={styles.bandsContentContainer}
              >
                {item.bands.map((band, index) => (
                  <View key={index} style={styles.bandNameContainer}>
                    <Text style={styles.bandName}>{band}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        />
      ) : (
        <Text>No upcoming gigs found.</Text>
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
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  bandsContainer: {
    flexGrow: 0, // Prevents ScrollView from stretching
  },
  bandsContentContainer: {
    alignItems: 'center', // Align items center in the content container of the ScrollView
    paddingHorizontal: 5, // Padding inside the ScrollView
  },
  bandNameContainer: {
    marginRight: 10,
    backgroundColor: "#e1e1e1",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bandName: {
    color: "#000",
    fontSize: 14,
  },
});

export default MyGigsScreen;
