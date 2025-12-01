import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import Select from "../../components/common/Select";
import PhoneInput from "../../components/common/PhoneInput";
import { countries, cities } from "../../data/countries";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import EmailIcon from "../../../assets/images/email.svg";

const SignUpFormScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("AZ");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("AZ");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const countryOptions = countries.map((c) => ({
    value: c.code,
    label: c.name,
    icon: c.flag,
  }));

  const cityOptions = (cities[country] || []).map((c) => ({
    value: c,
    label: c,
  }));

  const selectedCountry = countries.find((c) => c.code === country);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email tələb olunur";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Etibarlı email daxil edin";
    if (!country) newErrors.country = "Ölkə seçilməlidir";
    if (!city) newErrors.city = "Şəhər seçilməlidir";
    if (!phoneNumber.trim())
      newErrors.phoneNumber = "Telefon nömrəsi tələb olunur";
    if (!agreed) newErrors.agreed = "Şərtləri qəbul etməlisiniz";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    navigation.navigate("SignUpVerificationScreen", {
      phoneNumber: `+${phoneCountryCode} ${phoneNumber}`,
      email,
      method: "phone",
      currentStep: 2,
      totalSteps: 6,
      flow: "register",
    });
  };

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setCity("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenHeader
          onBackPress={() => navigation.goBack()}
          currentStep={1}
          totalSteps={6}
          showProgress={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Become a Tripsify driver 🚗</Text>
          <Text style={styles.subtitle}>
            To enhance your travel journey, we'd love to know more about you.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <EmailIcon style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your e-mail address"
                placeholderTextColor={colors.textLight}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <Select
            label="Country of Residence"
            value={country}
            options={countryOptions}
            onSelect={handleCountryChange}
            placeholder="Select country"
            icon={selectedCountry?.flag}
            error={errors.country}
          />
          <Select
            label="City of Residence"
            value={city}
            options={cityOptions}
            onSelect={setCity}
            placeholder="Select city"
            error={errors.city}
          />

          <PhoneInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            countryCode={phoneCountryCode}
            onCountryChange={setPhoneCountryCode}
            error={errors.phoneNumber}
          />

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agreed && styles.checkboxChecked]}
              onPress={() => setAgreed(!agreed)}
            >
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              By registering, you agree to the{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("TermsOfService")}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                Privacy Policy
              </Text>
              , commit to complying with the obligations arising from EU and
              local legislation, and undertake to provide only lawful services
              and content on the Tripsify platform.
            </Text>
          </View>
          {errors.agreed && (
            <Text style={styles.errorText}>{errors.agreed}</Text>
          )}
        </ScrollView>

        <View style={styles.bottomSection}>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: spacing.large,
    gap: 24,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.text,
    marginTop: spacing.medium,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
    lineHeight: 22.4,
    letterSpacing: 0.2,
  },
  inputContainer: {
    marginBottom: spacing.large,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.small,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
  },
  inputIcon: {
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.error,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: spacing.medium,
    marginBottom: spacing.large,
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    color: colors.white,
    fontSize: 12,
  },
  checkboxText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#000000",
    lineHeight: 25.6,
  },
  link: {
    fontFamily: fontFamily.semiBold,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  continueButton: {
    height: 55,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.white,
  },
});

export default SignUpFormScreen;
