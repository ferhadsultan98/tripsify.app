import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { countries } from "../../data/countries";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import DownArrowIcon from "../../../assets/images/downArrowIcon.svg";
import { useTheme } from "../../context/ThemeContext"; 

const PhoneInput = ({
  label,
  value,
  onChangeText,
  countryCode,
  onCountryChange,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme(); 

  const selectedCountry =
    countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.textPrimary }]}>{label}</Text>}

      <View style={styles.phoneWrapper}>
        <TouchableOpacity
          style={[styles.countryButton, { backgroundColor: theme.inputBg }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={[styles.dialCode, { color: theme.textPrimary }]}>{selectedCountry.dialCode}</Text>
          <Text style={[styles.dropdownIcon, { color: theme.textSecondary }]}>
            <DownArrowIcon />
          </Text>
        </TouchableOpacity>

        <TextInput
          style={[
             styles.input, 
             { backgroundColor: theme.inputBg, color: theme.textPrimary },
             error && { borderColor: theme.error, borderWidth: 1 } 
          ]}
          placeholder="Mobile phone"
          placeholderTextColor={theme.textSecondary}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      {error && <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Select Country Code</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, { color: theme.textSecondary }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    { borderBottomColor: theme.border },
                    countryCode === item.code && { 
                        backgroundColor: theme.mode === 'dark' ? '#2C2C2C' : '#F5F0FF' 
                    },
                  ]}
                  onPress={() => {
                    onCountryChange(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={[styles.countryName, { color: theme.textPrimary }]}>{item.name}</Text>
                  <Text style={[styles.countryDialCode, { color: theme.textSecondary }]}>{item.dialCode}</Text>
                  {countryCode === item.code && (
                    <Text style={[styles.checkmark, { color: theme.primary }]}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.large,
  },

  /** LABEL **/
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: colors.text, // Dinamik
    marginBottom: spacing.small,
  },

  phoneWrapper: {
    flexDirection: "row",
    gap: spacing.small,
  },

  /** COUNTRY BUTTON **/
  countryButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 10,
    gap: 6,
    borderRadius: 8,
    // backgroundColor: "#F2F2F2", // Dinamik
  },
  flag: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
  },
  dialCode: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
  dropdownIcon: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.textLight, // Dinamik
  },

  /** PHONE INPUT **/
  input: {
    flex: 1,
    height: 55,
    borderRadius: 8,
    // backgroundColor: "#F2F2F2", // Dinamik
    paddingHorizontal: 10,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
  inputError: {
    // borderColor: colors.error, // Dinamik olaraq inline verilir
  },

  /** ERROR TEXT **/
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.error, // Dinamik
    marginTop: 4,
  },

  /** MODAL **/
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    // backgroundColor: colors.white, // Dinamik
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    // borderBottomColor: "#F0F0F0", // Dinamik
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
  closeButton: {
    fontFamily: fontFamily.regular,
    fontSize: 24,
    // color: colors.textLight, // Dinamik
  },

  /** OPTIONS LIST **/
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    // borderBottomColor: "#F5F5F5", // Dinamik
  },
  countryItemSelected: {
    // backgroundColor: "#F5F0FF", // Dinamik
  },
  countryFlag: {
    fontFamily: fontFamily.regular,
    fontSize: 24,
    marginRight: spacing.medium,
  },
  countryName: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
  countryDialCode: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: colors.textLight, // Dinamik
    marginRight: spacing.small,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    // color: colors.primary, // Dinamik
  },
});

export default PhoneInput;
