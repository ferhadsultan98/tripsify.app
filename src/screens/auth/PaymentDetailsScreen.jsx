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
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const PaymentDetailsScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook
  const [billingType, setBillingType] = useState("");
  const [address, setAddress] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [errors, setErrors] = useState({});

  const billingTypeOptions = [
    { value: "person", label: "Person" },
    { value: "company", label: "Company" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!billingType) newErrors.billingType = "Billing type is required";
    if (!accountHolderName.trim())
      newErrors.accountHolderName = "Account holder name is required";
    if (!accountNumber.trim())
      newErrors.accountNumber = "Account number is required";
    if (!bankName.trim()) newErrors.bankName = "Bank name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    navigation.navigate("ExploreScreen");
  };

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenHeader
          onBackPress={() => navigation.goBack()}
          currentStep={6}
          totalSteps={6}
          showProgress={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>Payment details</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            We need your payment details to pay you.
          </Text>

          <Select
            label="Billing type"
            required
            value={billingType}
            options={billingTypeOptions}
            onSelect={setBillingType}
            placeholder="Person"
            error={errors.billingType}
          />

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Address</Text>
            <TextInput
              style={[
                  styles.input, 
                  { 
                      backgroundColor: theme.inputBg, 
                      color: theme.textPrimary 
                  }
              ]}
              placeholder="Address"
              placeholderTextColor={theme.textSecondary}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              Bank account holder name <Text style={[styles.required, { color: theme.error }]}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.inputBg, color: theme.textPrimary },
                errors.accountHolderName && { borderColor: theme.error, borderWidth: 1 },
              ]}
              placeholder="ABC Transportation Ltd / John Doe"
              placeholderTextColor={theme.textSecondary}
              value={accountHolderName}
              onChangeText={setAccountHolderName}
            />
            <Text style={[styles.helperText, { color: theme.textSecondary }]}>
              Bank account holder name, person or company
            </Text>
            {errors.accountHolderName && (
              <Text style={[styles.errorText, { color: theme.error }]}>{errors.accountHolderName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              Bank account number <Text style={[styles.required, { color: theme.error }]}>*</Text>
            </Text>
            <TextInput
              style={[
                  styles.input, 
                  { backgroundColor: theme.inputBg, color: theme.textPrimary },
                  errors.accountNumber && { borderColor: theme.error, borderWidth: 1 }
              ]}
              placeholder="EE38 2200 2210 2014 5685"
              placeholderTextColor={theme.textSecondary}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="default"
            />
            <Text style={[styles.helperText, { color: theme.textSecondary }]}>
              Your bank account number, in IBAN or other format
            </Text>
            {errors.accountNumber && (
              <Text style={[styles.errorText, { color: theme.error }]}>{errors.accountNumber}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              Bank Name or BIC/SWIFT <Text style={[styles.required, { color: theme.error }]}>*</Text>
            </Text>
            <TextInput
              style={[
                  styles.input, 
                  { backgroundColor: theme.inputBg, color: theme.textPrimary },
                  errors.bankName && { borderColor: theme.error, borderWidth: 1 }
              ]}
              placeholder="HABALT22"
              placeholderTextColor={theme.textSecondary}
              value={bankName}
              onChangeText={setBankName}
            />
            <Text style={[styles.helperText, { color: theme.textSecondary }]}>If unknown, use bank's name</Text>
            {errors.bankName && (
              <Text style={[styles.errorText, { color: theme.error }]}>{errors.bankName}</Text>
            )}
          </View>
        </ScrollView>

        <View style={[styles.bottomSection, { borderTopColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: theme.primary }]}
            onPress={handleContinue}
          >
            <Text style={[styles.continueButtonText, { color: '#FFFFFF' }]}>Continue</Text>
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
  },

  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    // color: colors.text, // Dinamik
    marginBottom: spacing.small,
  },

  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.textLight, // Dinamik
    lineHeight: 22.4,
    marginBottom: spacing.xlarge,
  },

  inputContainer: {
    marginBottom: spacing.large,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: colors.text, // Dinamik
    marginBottom: spacing.small,
  },
  required: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    // color: colors.error, // Dinamik
  },

  input: {
    borderRadius: 8,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.text, // Dinamik
    borderRadius: 8,
    // backgroundColor: "#F2F2F2", // Dinamik
    height: 55,
    padding: 15,
  },
  inputError: {
    // borderColor: colors.error, // Dinamik inline
  },

  helperText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    // color: colors.textLight, // Dinamik
    marginTop: 4,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    // color: colors.error, // Dinamik
    marginTop: 4,
  },

  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
    // borderTopColor: "#F0F0F0", // Dinamik
  },
  continueButton: {
    height: 55,
    borderRadius: 25,
    // backgroundColor: colors.primary, // Dinamik
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: colors.white, // Dinamik
  },
});

export default PaymentDetailsScreen;
