import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CitySearchScreen from './screens/CitySearchScreen';
import ArtistSearchScreen from './screens/ArtistSearchScreen';
import GigListScreen from './screens/GigListScreen';
import GigDetailsScreen from './screens/GigDetailsScreen';
import MyGigsScreen from './screens/MyGigsScreen';
import PlaylistScreen from './screens/PlaylistCreationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CitySearch" component={CitySearchScreen} />
        <Stack.Screen name="ArtistSearch" component={ArtistSearchScreen} />
        <Stack.Screen name="GigList" component={GigListScreen} />
        <Stack.Screen name="GigDetails" component={GigDetailsScreen} />
        <Stack.Screen name="MyGigs" component={MyGigsScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
