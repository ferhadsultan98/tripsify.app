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
  I18nManager,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import ScreenHeader from '../../components/common/ScreenHeader';
import PhoneInput from '../../components/common/PhoneInput';
import EmailIcon from '../../../assets/images/email.svg';
import { spacing } from '../../styles/spacing';
import { fontFamily } from '../../styles/fonts';
import { useTheme } from '../../context/ThemeContext';

// API Hooks
import { authService } from '../../api/auth';
import useApi from '../../hooks/useApi';

const LoginFormScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('1'); // Default US
  const [email, setEmail] = useState('');
  
  const slideAnim = useRef(new Animated.Value(0)).current;

  // API Hook
  const sendOtpApi = useApi(authService.sendOtp);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: activeTab === 'phone' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const handleContinue = async () => {
    // 1. Validasiya
    if (activeTab === 'email' && !email.trim()) {
        Alert.alert("Error", "Please enter your email.");
        return;
    }
    if (activeTab === 'phone' && !phoneNumber.trim()) {
         Alert.alert("Error", "Please enter your phone number.");
         return;
    }

    // 2. API Sorğusu (Sadece Email üçün dinamik edirik)
    if (activeTab === 'email') {
        const { data, error } = await sendOtpApi.request({ email });

        if (data) {
            // Uğurlu keçid
            console.log("OTP Sent:", data);
            navigation.navigate('VerificationCodeScreen', { 
                email: email,
                method: 'email',
                currentStep: 2,
                totalSteps: 2,
                flow: 'login', // Login flow olduğunu bildiririk
            });
        }

        if (error) {
            console.error("Send OTP Error:", error);
            Alert.alert("Error", error.error || "Failed to send OTP. User might not exist.");
        }
    } else {
        // Phone hissəsi hələlik statik qalır (backend hazır olanda bura da eyni məntiq tətbiq olunacaq)
        navigation.navigate('VerificationCodeScreen', { 
          phoneNumber: `+${phoneCountryCode} ${phoneNumber}`,
          email: null,
          method: 'phone',
          currentStep: 2,
          totalSteps: 2,
          flow: 'login',
        });
    }
  };

  const indicatorPosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
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
          <View style={[styles.tabContainer, { backgroundColor: theme.inputBg }]}>
            <Animated.View
              style={[
                styles.indicator,
                {
                  left: indicatorPosition,
                  backgroundColor: theme.primary
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
                  { color: activeTab === 'phone' ? '#FFFFFF' : theme.textPrimary }
                ]}
              >
                {t('login_form.tabs.phone')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, styles.tabRight]}
              onPress={() => setActiveTab('email')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'email' ? '#FFFFFF' : theme.textPrimary }
                ]}
              >
                {t('login_form.tabs.email')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {t('login_form.title')}
          </Text>

          {/* Description */}
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {activeTab === 'phone'
              ? t('login_form.description_phone')
              : t('login_form.description_email')}
          </Text>

          {/* Input */}
          <View style={styles.inputWrapper}>
            {activeTab === 'phone' ? (
              <PhoneInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                countryCode={phoneCountryCode}
                onCountryChange={setPhoneCountryCode}
                placeholder={t('login_form.placeholders.phone')}
              />
            ) : (
              <View style={[styles.emailInputWrapper, { backgroundColor: theme.inputBg }]}>
                <EmailIcon width={20} height={20} fill={theme.textSecondary} />
                <TextInput
                  style={[styles.emailInput, { color: theme.textPrimary }]}
                  placeholder={t('login_form.placeholders.email')}
                  placeholderTextColor={theme.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
              </View>
            )}
          </View>

          {/* Bottom Button */}
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: theme.primary }]}
            onPress={handleContinue}
            disabled={sendOtpApi.loading}
          >
            {sendOtpApi.loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={[styles.continueButtonText, { color: '#FFFFFF' }]}>
                    {t('login_form.continue')}
                </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: spacing.medium },
  tabContainer: { flexDirection: 'row', marginBottom: spacing.xlarge, position: 'relative', borderRadius: 8, height: 48 },
  indicator: { position: 'absolute', width: '50%', height: '100%', borderRadius: 8, zIndex: 0 },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  tabLeft: { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  tabRight: { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  tabText: { fontFamily: fontFamily.semiBold, fontSize: 14 },
  title: { fontFamily: fontFamily.bold, fontSize: 28, marginBottom: spacing.medium, textAlign: 'left' },
  description: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 22.4, letterSpacing: 0.2, marginBottom: spacing.xlarge, textAlign: 'left' },
  inputWrapper: { minHeight: 56 },
  emailInputWrapper: { flexDirection: 'row', alignItems: 'center', height: 55, borderRadius: 8, paddingHorizontal: 20, gap: 12 },
  emailInput: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16 },
  continueButton: { height: 55, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: spacing.xlarge },
  continueButtonText: { fontFamily: fontFamily.semiBold, fontSize: 16 },
});

export default LoginFormScreen;
