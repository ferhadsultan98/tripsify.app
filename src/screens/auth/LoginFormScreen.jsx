import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import PhoneInput from '../../components/common/PhoneInput';
import EmailIcon from '../../../assets/images/email.svg';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamily } from '../../styles/fonts';

const LoginFormScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('US');
  const [email, setEmail] = useState('');
  
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: activeTab === 'phone' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const handleContinue = () => {
    if (activeTab === 'phone') {
      navigation.navigate('VerificationCodeScreen', { 
        phoneNumber: `+${phoneCountryCode} ${phoneNumber}`,
        email: null,
        method: 'phone',
        currentStep: 2,
        totalSteps: 2,
        flow: 'login',
      });
    } else {
      navigation.navigate('VerificationCodeScreen', { 
        phoneNumber: null,
        email,
        method: 'email',
        currentStep: 2,
        totalSteps: 2,
        flow: 'login', // ← MÜHİM
      });
    }
  };

  const indicatorPosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenHeader 
          onBackPress={() => navigation.goBack()} 
          currentStep={1} 
          totalSteps={2}
                  showProgress={true}

        />

        <View style={styles.content}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <Animated.View
              style={[
                styles.indicator,
                {
                  left: indicatorPosition,
                },
              ]}
            />
            <TouchableOpacity
              style={[styles.tab, styles.tabLeft]}
              onPress={() => setActiveTab('phone')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'phone' && styles.tabTextActive,
                ]}
              >
                Phone Number
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, styles.tabRight]}
              onPress={() => setActiveTab('email')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'email' && styles.tabTextActive,
                ]}
              >
                E-mail
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>Welcome back, dear driver!🤗</Text>

          {/* Description */}
          <Text style={styles.description}>
            {activeTab === 'phone'
              ? 'Please note that a verification code will be sent to the mobile number you entered to log in at a later stage.'
              : 'Please note that a verification code will be sent to the e-mail address you entered to log in at a later stage.'}
          </Text>

          {/* Input */}
          <View style={styles.inputWrapper}>
            {activeTab === 'phone' ? (
              <PhoneInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                countryCode={phoneCountryCode}
                onCountryChange={setPhoneCountryCode}
                placeholder="Mobile phone"
              />
            ) : (
              <View style={styles.emailInputWrapper}>
                <EmailIcon width={20} height={20} fill={colors.textLight} />
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter your e-mail address"
                  placeholderTextColor={colors.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            )}
          </View>

          {/* Bottom Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: spacing.medium,
  },

  /** TABS **/
  tabContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xlarge,
    position: 'relative',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    height: 48,
  },
  indicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    zIndex: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tabLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  tabRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  tabText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14, 
    color: colors.text,
  },
  tabTextActive: {
    color: colors.white,
  },

  /** TITLE **/
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 28, 
    color: colors.text,
    marginBottom: spacing.medium,
  },

  /** DESCRIPTION **/
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.textLight,
    lineHeight: 22.4,
    letterSpacing: 0.2,
    marginBottom: spacing.xlarge,
  },

  /** INPUTS **/
  inputWrapper: {
    minHeight: 56,
  },
  emailInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
    gap: 12,
  },
  emailInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.text,
  },

  /** BUTTON **/
  continueButton: {
    height: 55,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xlarge,
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16, 
    color: colors.white,
  },
});


export default LoginFormScreen;
