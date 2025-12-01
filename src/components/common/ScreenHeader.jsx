import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import ProgressBar from './ProgressBar';
import { spacing } from '../../styles/spacing';
import { colors } from '../../styles/colors';
import { fontFamily } from "../../styles/fonts";

const ScreenHeader = ({
  onBackPress,
  currentStep,
  totalSteps,
  showProgress = false, 
  title,
  rightIcon, 
  onRightIconPress, 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <BackButton onPress={onBackPress} />

        <View style={styles.titleWrapper}>
          {showProgress && currentStep && totalSteps ? (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          ) : (
            <Text style={styles.titleInline} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} /> 
        )}
      </View>

   
      {showProgress && title && (
        <Text style={styles.titleBelow}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.horizontal,
    paddingTop: 12,
    paddingBottom: 16,
    // backgroundColor: '#FFF', 
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    height: 48,
  },
  titleWrapper: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 16, 
  },
  progressWrapper: {
    width: '100%',
  },
  titleInline: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: '#212121',
    textAlign: 'center',
  },
  titleBelow: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    color: '#424242',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ScreenHeader;
