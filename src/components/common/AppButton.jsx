import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { useTheme } from '../../context/ThemeContext'; // Theme hook
import { fontFamily, fontSize } from '../../styles/fonts';

const AppButton = ({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary' | 'outline'
  isLoading = false,
  disabled = false,
  style 
}) => {
  const { theme } = useTheme();

  // Button üslubunu varianta görə təyin edirik
  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: variant === 'primary' ? theme.primary : theme.cardBg,
      borderColor: variant === 'outline' ? theme.border : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
    };
    
    // Əgər deaktivdirsə, rəngi bozardaq
    if (disabled) {
        baseStyle.backgroundColor = theme.border; 
        baseStyle.opacity = 0.7;
    }
    
    return baseStyle;
  };

  // Mətn rəngini varianta görə təyin edirik
  const getTextColor = () => {
    if (variant === 'primary') return '#FFFFFF'; // Primary həmişə ağ
    return theme.textPrimary; // Outline isə tema rəngi
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[
        styles.button, 
        getButtonStyle(), 
        style // Kənardan gələn margin/padding üçün
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 55,              // LoginScreen dizaynına uyğun
    borderRadius: 25,        // LoginScreen dizaynına uyğun
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
  },
});

export default AppButton;
