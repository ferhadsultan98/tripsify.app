import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import { spacing } from '../../styles/spacing';
import { fontFamily } from '../../styles/fonts';
import { useTheme } from '../../context/ThemeContext'; // Theme Hook

const VerificationCodeScreen = ({ navigation, route }) => {
  const { theme } = useTheme(); // Theme hook
  const { 
    phoneNumber, 
    email, 
    method, 
    currentStep, 
    totalSteps,
    flow
  } = route.params || {};
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(27);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && text) {
      const fullCode = [...newCode.slice(0, 5), text].join('');
      if (fullCode.length === 6) {
        setTimeout(() => {
          if (flow === 'login') {
            navigation.replace('MainTabs');
          } else {
            navigation.navigate('PersonalInfoScreen', {
              phoneNumber,
              email,
              currentStep: 3,
              totalSteps: 6,
            });
          }
        }, 300);
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Mətnləri müəyyən et
  const verificationTarget = method === 'phone' ? 'this number' : 'your email';
  const contact = method === 'phone' ? phoneNumber : email;

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <ScreenHeader 
          onBackPress={() => navigation.goBack()} 
          currentStep={currentStep || 2} 
          totalSteps={totalSteps || 6} 
          showProgress={true}
        />

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>Enter the code</Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            The verification code has been sent to {verificationTarget}:
          </Text>
          <Text style={[styles.contactInfo, { color: theme.primary }]}>
            {contact || (method === 'phone' ? '+994502122237' : 'example@mail.com')}
          </Text>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeBox,
                  { 
                      // Default rənglər (boş olduqda)
                      backgroundColor: theme.inputBg,
                      borderColor: theme.border,
                      color: theme.textPrimary 
                  },
                  digit && {
                      // Dolu olduqda
                      borderColor: theme.primary,
                      backgroundColor: theme.cardBg
                  },
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          <Text style={[styles.resendText, { color: theme.textSecondary }]}>
            Resend the code after the time shown: <Text style={[styles.timer, { color: theme.primary }]}>{timer}s</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: spacing.large,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    // color: colors.text, // Dinamik
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.textLight, // Dinamik
    textAlign: 'center',
    marginBottom: 4,
  },
  contactInfo: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: colors.primary, // Dinamik
    textAlign: 'center',
    marginBottom: spacing.xlarge,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: spacing.large,
  },
  codeBox: {
    width: 52,
    height: 65,
    borderRadius: 12,
    borderWidth: 2,
    // borderColor: '#E0E0E0', // Dinamik
    // backgroundColor: '#F5F5F5', // Dinamik
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    textAlign: 'center',
    // color: colors.text, // Dinamik
  },
  codeBoxFilled: {
    // borderColor: colors.primary, // Dinamik
    // backgroundColor: colors.white, // Dinamik
  },
  resendText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    // color: colors.textLight, // Dinamik
    textAlign: 'center',
  },
  timer: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    // color: colors.primary, // Dinamik
  },
});

export default VerificationCodeScreen;
