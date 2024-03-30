// CitySearchScreen.js

import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const CitySearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState([]);

  const handleSearch = async (query) => {
    try {
      // Make GET request to Ticketmaster API search endpoint
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/suggest?apikey=LZqHgCDf5jG2KZnMI0jzijcTra4fxedW&keyword=${query}&classificationName=city&countryCode=GB`
      );
  
      // Extract cities from the response data
      const suggestedCities = response.data._embedded?.attractions.map(
        (city) => city.name
      );
  
      // Update 'cities' state with the fetched cities
      setCities(suggestedCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a city..."
        onChangeText={handleSearch}
        value={searchQuery}
        editable={true}
      />
      <FlatList
        data={cities}
        renderItem={({ item }) => <Text style={styles.city}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  city: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CitySearchScreen;
