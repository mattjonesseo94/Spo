import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

export default function App() {
  return (
    <View style={styles.container}>
      {/* Navigation Container wraps the whole navigation structure */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home'}} />
          <Stack.Screen name="CitySearchScreen" component={CitySearchScreen} options={{ title: 'City Search'}} />
          <Stack.Screen name="ArtistSearchScreen" component={ArtistSearchScreen} options={{ title: 'Artist Search'}} />
          <Stack.Screen name="GigList" component={GigListScreen} options={{ title: 'Gig List' }} />
          <Stack.Screen name="GigDetails" component={GigDetailsScreen} options={{ title: 'Gig Details' }} />
          <Stack.Screen name="MyGigs" component={MyGigsScreen} options={{ title: 'My Gigs' }} />
          <Stack.Screen name="Playlist" component={PlaylistScreen} options={{ title: 'Playlists' }} />
          {/* Add other screens to the navigator as needed */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* StatusBar can be moved inside NavigationContainer if you prefer */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center', // Comment out or remove to allow the navigator to fill the screen
    // justifyContent: 'center', // Comment out or remove to allow the navigator to fill the screen
  },
});
