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
import { spacing } from '../../styles/spacing';
import { fontFamily } from '../../styles/fonts';
import { useTheme } from '../../context/ThemeContext'; // Theme Hook

const PersonalInfoScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook
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
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
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
          <Text style={[styles.title, { color: theme.textPrimary }]}>Personal Informations</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            The customer will only see your name and contact information.
          </Text>

          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>First Name *</Text>
            <TextInput
              style={[
                  styles.input, 
                  { 
                      backgroundColor: theme.inputBg, 
                      color: theme.textPrimary 
                  }
              ]}
              placeholder="First name"
              placeholderTextColor={theme.textSecondary}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Surname */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Surname *</Text>
            <TextInput
              style={[
                  styles.input, 
                  { 
                      backgroundColor: theme.inputBg, 
                      color: theme.textPrimary 
                  }
              ]}
              placeholder="Surname"
              placeholderTextColor={theme.textSecondary}
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
            searchable={false}
          />

          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasVehicle(!hasVehicle)}
          >
            <View 
                style={[
                    styles.checkbox, 
                    { borderColor: theme.border },
                    hasVehicle && { 
                        backgroundColor: theme.primary, 
                        borderColor: theme.primary 
                    }
                ]}
            >
              {hasVehicle && <Text style={[styles.checkmark, { color: '#FFFFFF' }]}>✓</Text>}
            </View>
            <Text style={[styles.checkboxText, { color: theme.textPrimary }]}>
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
                <Text style={[styles.label, { color: theme.textPrimary }]}>License plate *</Text>
                <TextInput
                  style={[
                      styles.input, 
                      { 
                          backgroundColor: theme.inputBg, 
                          color: theme.textPrimary 
                      }
                  ]}
                  placeholder="77-TT-777"
                  placeholderTextColor={theme.textSecondary}
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

  /** TITLE **/
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24, 
    // color: colors.text, // Dinamik
    marginBottom: spacing.small,
  },

  /** SUBTITLE **/
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    // color: colors.textLight, // Dinamik
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
    // color: colors.text, // Dinamik
    marginBottom: spacing.small,
  },
  input: {
    height: 55,
    borderRadius: 8,
    
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    // color: colors.text, // Dinamik
    borderRadius: 8,
    // backgroundColor: "#F2F2F2", // Dinamik
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
    // borderColor: colors.border, // Dinamik
    marginRight: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    // backgroundColor: colors.primary, // Dinamik inline
    // borderColor: colors.primary, // Dinamik inline
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    // color: colors.white, // Dinamik inline
    fontSize: 12, 
  },
  checkboxText: {
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    // color: colors.text, // Dinamik
  },

  /** BOTTOM SECTION **/
  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
    // borderTopColor: '#F0F0F0', // Dinamik
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

export default PersonalInfoScreen;
