// MyGigsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const MyGigsScreen = () => {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  const [attendingGigs, setAttendingGigs] = useState([]);

  useEffect(() => {
    const loadAttendingGigs = async () => {
      try {
        const savedAttendingGigs = await AsyncStorage.getItem('attendingGigs');
        if (savedAttendingGigs !== null) {
          setAttendingGigs(JSON.parse(savedAttendingGigs));
        }
      } catch (error) {
        console.error('Error loading attending gigs:', error);
      }
    };

    loadAttendingGigs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Attending Gigs</Text>
      <FlatList
        data={attendingGigs}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.gigItem}>
            <Text>{item.name}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gigItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MyGigsScreen;
