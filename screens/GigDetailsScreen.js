import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GigDetailsScreen = ({ route }) => {
    const { gig } = route.params;

    return (
        <View style={styles.container}>
          <Text style={styles.header}>{gig.name}</Text>
          <Text>{gig.details}</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    });


export default GigDetailsScreen;
