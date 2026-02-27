import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import ProgressBar from './ProgressBar';
import { spacing } from '../../styles/spacing';
import { fontFamily } from "../../styles/fonts";
import { useTheme } from '../../context/ThemeContext'; // YENİ: Theme Hook

const ScreenHeader = ({
  onBackPress,
  currentStep,
  totalSteps,
  showProgress = false, 
  title,
  rightIcon, 
  onRightIconPress, 
}) => {
  const { theme } = useTheme(); // Theme Hook-dan istifadə

  return (
    // Container-in arxa fon rəngini dinamik edə bilərsiniz, 
    // amma adətən parent komponent (məsələn SafeAreaView) bunu həll edir.
    // Əgər header ayrıca rəngdə olmalıdırsa: backgroundColor: theme.background
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.topRow}>
        <BackButton onPress={onBackPress} />

        <View style={styles.titleWrapper}>
          {showProgress && currentStep && totalSteps ? (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          ) : (
            <Text 
              style={[styles.titleInline, { color: theme.textPrimary }]} 
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
        </View>

        {rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress}>
            {/* Sağ ikonu göstərərkən onun rəngini də valideyn komponentdən idarə etmək olar, 
                və ya əgər bu bir SVG-dirsə, fill={theme.iconColor} verilə bilər */}
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} /> 
        )}
      </View>

      {showProgress && title && (
        <Text style={[styles.titleBelow, { color: theme.textSecondary }]}>
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    // backgroundColor: '#FFF', // Silindi, inline style-da dinamik oldu
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
    // color: '#212121', // Silindi, inline style-da dinamik oldu
    textAlign: 'center',
  },
  titleBelow: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    // color: '#424242', // Silindi, inline style-da dinamik oldu
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ScreenHeader;
