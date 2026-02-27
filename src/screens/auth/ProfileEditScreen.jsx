import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import Select from "../../components/common/Select";
import PhoneInput from "../../components/common/PhoneInput";
import EditIcon from "../../../assets/images/editIcon.svg";
import EmailIcon from "../../../assets/images/email.svg";
import { countries, cities } from "../../data/countries";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext";
import { launchImageLibrary } from "react-native-image-picker";

import winterLogo from "../../../assets/images/winterLogo.png";

const ProfileEditScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "Vugar",
    surname: "Alishov",
    email: "alishov10@gmail.com",
    country: "PL",
    city: "Krakow",
    phoneNumber: "50122297",
    phoneCountryCode: "AZ",
    gender: "Man",
  });

  const countryOptions = countries.map((c) => ({
    value: c.code,
    label: c.name,
    icon: c.flag,
  }));

  const cityOptions = (cities[formData.country] || []).map((c) => ({
    value: c,
    label: c,
  }));

  const genderOptions = [
    { value: "Man", label: "Man" },
    { value: "Woman", label: "Woman" },
    { value: "Other", label: "Other" },
  ];

  const selectedCountry = countries.find((c) => c.code === formData.country);
  const [profileImage, setProfileImage] = useState(null);

  const handleCountryChange = (newCountry) => {
    setFormData({ ...formData, country: newCountry, city: "" });
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    navigation.goBack();
  };
  const handlePickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8, selectionLimit: 1 },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setProfileImage(response.assets[0].uri);
        }
      },
    );
  };
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenHeader
          title="Personal Info"
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            <View style={styles.imageContainer}>
              {/* SVG əvəzinə Image komponenti və import edilmiş PNG */}
              <Image
                source={profileImage ? { uri: profileImage } : winterLogo}
                style={styles.profileImage}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={handlePickImage}
              >
                <EditIcon width={25} height={25} fill="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textPrimary }]}>
                Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.inputBg, color: theme.textPrimary },
                ]}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Name"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textPrimary }]}>
                Surname
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.inputBg, color: theme.textPrimary },
                ]}
                value={formData.surname}
                onChangeText={(text) =>
                  setFormData({ ...formData, surname: text })
                }
                placeholder="Surname"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textPrimary }]}>
                Email
              </Text>
              <View
                style={[styles.emailInput, { backgroundColor: theme.inputBg }]}
              >
                <EmailIcon
                  width={20}
                  height={20}
                  style={styles.emailIcon}
                  fill={theme.textSecondary}
                />
                <TextInput
                  style={[styles.emailTextInput, { color: theme.textPrimary }]}
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  placeholder="Email"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Select
              label="Gender"
              value={formData.gender}
              options={genderOptions}
              onSelect={(gender) => setFormData({ ...formData, gender })}
              placeholder="Select gender"
              searchable={false} // ← bunu əlavə et
            />
            <Select
              label="Country of Residence"
              value={formData.country}
              options={countryOptions}
              onSelect={(country) => setFormData({ ...formData, country })}
              placeholder="Select country"
            />
            <Select
              label="City of Residence"
              value={formData.city}
              options={cityOptions}
              onSelect={(city) => setFormData({ ...formData, city })}
              placeholder="Select city"
            />

            <PhoneInput
              label="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, phoneNumber: text })
              }
              countryCode={formData.phoneCountryCode}
              onCountryChange={(code) =>
                setFormData({ ...formData, phoneCountryCode: code })
              }
            />

            <Select
              label="Gender"
              value={formData.gender}
              options={genderOptions}
              onSelect={(gender) => setFormData({ ...formData, gender })}
              placeholder="Select gender"
            />
          </View>
        </ScrollView>

        <View style={[styles.bottomSection, { borderTopColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.primary }]}
            onPress={handleSave}
          >
            <Text style={[styles.saveButtonText, { color: "#FFFFFF" }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Tam dairə olması üçün
    backgroundColor: "#F5F5F5",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  input: {
    height: 55,
    paddingHorizontal: 20,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    borderRadius: 8,
  },

  emailInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emailIcon: {
    marginRight: spacing.small,
  },
  emailTextInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },

  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  saveButton: {
    height: 55,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
});

export default ProfileEditScreen;
