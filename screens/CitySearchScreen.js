import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const CitySearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState([]);

  // Debounce function
  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const fetchCities = async (query) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: {
          countryIds: 'GB',
          limit: '20'
        },
        headers: {
          'X-RapidAPI-Key': '6c98157734msh87c924889435af9p1a9023jsn5e724962e789',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };
  
      const response = await axios.request(options);
      const cities = response.data.data.map(city => ({
        name: city.name,
        country: city.country,
        id: city.id // Or any other identifier you need
      }));
  
      setCities(cities);
    } catch (error) {
      if (error.response && error.response.status === 429 && attempt <= 5) {
        // Wait for 2^attempt * 100 milliseconds before retrying
        const delay = Math.pow(2, attempt) * 100;
        setTimeout(() => fetchCities(query, attempt + 1), delay);
      } else {
        console.error('Error fetching cities:', error);
      }
    }
  };

  // Call the debounced version of fetchCities
  const debouncedFetchCities = debounce(fetchCities, 500);

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchCities(searchQuery);
    } else {
      setCities([]);
    }
  }, [searchQuery]);

  return (
<View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder="Search for a city..."
    onChangeText={setSearchQuery} // Assuming setSearchQuery is your method for handling input
    value={searchQuery}
    editable={true}
  />
  <FlatList
    data={cities}
    renderItem={({ item }) => (
      <Text style={styles.city}>{`${item.name}, ${item.country}`}</Text>
    )}
    keyExtractor={(item) => item.id.toString()}
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
