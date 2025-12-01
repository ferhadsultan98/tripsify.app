import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.background}>
      <View style={[styles.fill, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: 214,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 100,
    overflow: 'hidden',
    flex: "1 0 0",
    display: "flex",
  },
  fill: {
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});

export default ProgressBar;
