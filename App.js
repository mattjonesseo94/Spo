import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CitySearchScreen from './screens/CitySearchScreen';
import ArtistSearchScreen from './screens/ArtistSearchScreen';
import GigListScreen from './screens/GigListScreen';
import GigDetailsScreen from './screens/GigDetailsScreen';
import MyGigsScreen from './screens/MyGigsScreen';
import PlaylistScreen from './screens/PlaylistCreationScreen';
import HeaderButton from './HeaderButton'; // Import the HeaderButton component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="CitySearchScreen" component={CitySearchScreen} options={{ title: 'City Search' }} />
        <Stack.Screen name="ArtistSearchScreen" component={ArtistSearchScreen} options={{ title: 'Artist Search' }} />
        <Stack.Screen name="GigList" component={GigListScreen} options={{ title: 'Gig List' }} />
        <Stack.Screen name="GigDetailsScreen" component={GigDetailsScreen} options={{ title: 'Gig Details', headerRight: () => (
            <HeaderButton title="My Gigs" onPress={() => navigation.navigate('MyGigsScreen')} />
          ) }} />
        <Stack.Screen name="MyGigsScreen" component={MyGigsScreen} options={{ title: 'My Gigs' }} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} options={{ title: 'Playlists' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
