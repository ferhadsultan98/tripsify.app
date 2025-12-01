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
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";

const PaymentDetailsScreen = ({ navigation }) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
          <Text style={styles.title}>Payment details</Text>
          <Text style={styles.subtitle}>
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
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor={colors.textLight}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Bank account holder name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                errors.accountHolderName && styles.inputError,
              ]}
              placeholder="ABC Transportation Ltd / John Doe"
              placeholderTextColor={colors.textLight}
              value={accountHolderName}
              onChangeText={setAccountHolderName}
            />
            <Text style={styles.helperText}>
              Bank account holder name, person or company
            </Text>
            {errors.accountHolderName && (
              <Text style={styles.errorText}>{errors.accountHolderName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Bank account number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.accountNumber && styles.inputError]}
              placeholder="EE38 2200 2210 2014 5685"
              placeholderTextColor={colors.textLight}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="default"
            />
            <Text style={styles.helperText}>
              Your bank account number, in IBAN or other format
            </Text>
            {errors.accountNumber && (
              <Text style={styles.errorText}>{errors.accountNumber}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Bank Name or BIC/SWIFT <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.bankName && styles.inputError]}
              placeholder="HABALT22"
              placeholderTextColor={colors.textLight}
              value={bankName}
              onChangeText={setBankName}
            />
            <Text style={styles.helperText}>If unknown, use bank's name</Text>
            {errors.bankName && (
              <Text style={styles.errorText}>{errors.bankName}</Text>
            )}
          </View>
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
  },

  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.text,
    marginBottom: spacing.small,
  },

  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 22.4,
    marginBottom: spacing.xlarge,
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
  required: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.error,
  },

  input: {
    borderRadius: 8,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    height: 55,
    padding: 20,
  },
  inputError: {
    borderColor: colors.error,
  },

  helperText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
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

export default PaymentDetailsScreen;
