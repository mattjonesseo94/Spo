// HeaderButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HeaderButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default HeaderButton;
