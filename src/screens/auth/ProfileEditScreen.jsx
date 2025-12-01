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
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";

const ProfileEditScreen = ({ navigation }) => {
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

  const handleCountryChange = (newCountry) => {
    setFormData({ ...formData, country: newCountry, city: "" });
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
              <Image
                source={{ uri: "https://i.ibb.co/tpQx2nCy/app-con.png" }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIconContainer}>
                <EditIcon width={25} height={25} fill="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Name"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Surname</Text>
              <TextInput
                style={styles.input}
                value={formData.surname}
                onChangeText={(text) =>
                  setFormData({ ...formData, surname: text })
                }
                placeholder="Surname"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.emailInput}>
                <EmailIcon width={16} height={16} style={styles.emailIcon} />
                <TextInput
                  style={styles.emailTextInput}
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  placeholder="Email"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Select
              label="Country of Residence"
              value={formData.country}
              options={countryOptions}
              onSelect={handleCountryChange}
              placeholder="Select country"
              icon={selectedCountry?.flag}
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

  
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    // borderRadius: 16,
    // backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: "#FFF",
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
    color: colors.text,
  },
  input: {
    height: 55,
    paddingHorizontal: 20,
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.text,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
  },

  emailInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
  },
  emailIcon: {
    marginRight: 8,
  },
  emailTextInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16, 
    color: colors.text,
  },

  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  saveButton: {
    height: 55,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16, 
    color: "#FFF",
  },
});


export default ProfileEditScreen;
