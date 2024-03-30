import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayistScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Playlist Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayistScreen;
