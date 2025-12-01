import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import Select from '../../components/common/Select';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamily } from '../../styles/fonts';

const PersonalInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [hasVehicle, setHasVehicle] = useState(false);
  const [manufacturer, setManufacturer] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const manufacturerOptions = [
    { value: 'toyota', label: 'Toyota' },
    { value: 'mercedes', label: 'Mercedes' },
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'hyundai', label: 'Hyundai' },
  ];

  const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = 2025 - i;
    return { value: year.toString(), label: year.toString() };
  });

  const colorOptions = [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'silver', label: 'Silver' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
  ];

  const handleContinue = () => {
    // Validation və növbəti screen
  navigation.navigate('DocumentsScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenHeader 
          onBackPress={() => navigation.goBack()} 
          currentStep={4} 
          totalSteps={6} 
          showProgress={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Personal Informations</Text>
          <Text style={styles.subtitle}>
            The customer will only see your name and contact information.
          </Text>

          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              placeholderTextColor={colors.textLight}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Surname */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Surname *</Text>
            <TextInput
              style={styles.input}
              placeholder="Surname"
              placeholderTextColor={colors.textLight}
              value={surname}
              onChangeText={setSurname}
            />
          </View>

          {/* Gender */}
          <Select
            label="Gender *"
            value={gender}
            options={genderOptions}
            onSelect={setGender}
            placeholder="Gender"
          />

          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasVehicle(!hasVehicle)}
          >
            <View style={[styles.checkbox, hasVehicle && styles.checkboxChecked]}>
              {hasVehicle && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>
              I have a vehicle that I will drive.
            </Text>
          </TouchableOpacity>

          {hasVehicle && (
            <>
              {/* Manufacturer */}
              <Select
                label="Vehicle manufacturer and model *"
                value={manufacturer}
                options={manufacturerOptions}
                onSelect={setManufacturer}
                placeholder="Manufacturer"
              />

              {/* Vehicle Year */}
              <Select
                label="Vehicle year *"
                value={vehicleYear}
                options={yearOptions}
                onSelect={setVehicleYear}
                placeholder="Vehicle year"
              />

              {/* License Plate */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>License plate *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="77-TT-777"
                  placeholderTextColor={colors.textLight}
                  value={licensePlate}
                  onChangeText={setLicensePlate}
                />
              </View>

              {/* Vehicle Color */}
              <Select
                label="Vehicle colour *"
                value={vehicleColor}
                options={colorOptions}
                onSelect={setVehicleColor}
                placeholder="Colour"
              />
            </>
          )}
        </ScrollView>

        {/* Bottom Button */}
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

  /** TITLE **/
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24, 
    color: colors.text,
    marginBottom: spacing.small,
  },

  /** SUBTITLE **/
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.textLight,
    lineHeight: 22.4,
    marginBottom: spacing.xlarge,
  },

  /** INPUT CONTAINER **/
  inputContainer: {
    marginBottom: spacing.large,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16, 
    color: colors.text,
    marginBottom: spacing.small,
  },
  input: {
    height: 55,
    borderRadius: 8,
    
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.text,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
  },

  /** CHECKBOX **/
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: spacing.large,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.text,
  },

  /** BOTTOM SECTION **/
  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
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


export default PersonalInfoScreen;
