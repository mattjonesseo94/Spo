import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';


const gigs = [
    { id: '1', name: 'Gig One', details: 'Details about Gig One' },
    { id: '2', name: 'Gig Two', details: 'Details about Gig Two' },
    // Add more gig objects as needed
  ];
  

  const GigListScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={gigs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('GigDetails', { gig: item })}>
              <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
          )}
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
  

export default GigListScreen;


  