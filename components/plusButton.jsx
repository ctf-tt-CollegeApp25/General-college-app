import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const PlusButton = ({ onPress, postionStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} className={postionStyle}>
      <View style={styles.horizontalBar} />
      <View style={styles.verticalBar} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 50, // Circle shape
    backgroundColor: '#5700ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalBar: {
    position: 'absolute',
    width: 30,
    height: 4,
    backgroundColor: '#eeebe5',
  },
  verticalBar: {
    position: 'absolute',
    width: 4,
    height: 30,
    backgroundColor: '#eeebe5',
  },
});

export default PlusButton;