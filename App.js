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
import HeaderButton from './Components/HeaderButton';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ navigation }) => ({
          headerRight: () => <HeaderButton title="My Gigs" navigation={navigation} destination="MyGigsScreen" />,
        })}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="CitySearchScreen" component={CitySearchScreen} options={{ title: 'City Search' }} />
        <Stack.Screen name="ArtistSearchScreen" component={ArtistSearchScreen} options={{ title: 'Artist Search' }} />
        <Stack.Screen name="GigListScreen" component={GigListScreen} options={{ title: 'Gig List' }} />
        <Stack.Screen name="GigDetailsScreen" component={GigDetailsScreen} options={{ title: 'Gig Details' }} />
        <Stack.Screen name="MyGigsScreen" component={MyGigsScreen} options={{ title: 'My Gigs' }} />
        <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} options={{ title: 'Playlists' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;