import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <Text>This is the Gig List Screen</Text>
        <Button
          title="Go to Gig Details"
          onPress={() => navigation.navigate('CitySearchScreen')}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

export default HomeScreen;
