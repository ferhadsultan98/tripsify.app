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
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import DownArrowIcon from "../../../assets/images/downArrowIcon.svg";

const PhoneInput = ({
  label,
  value,
  onChangeText,
  countryCode,
  onCountryChange,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCountry =
    countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.phoneWrapper}>
        <TouchableOpacity
          style={styles.countryButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
          <Text style={styles.dropdownIcon}>
            <DownArrowIcon />
          </Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Mobile phone"
          placeholderTextColor={colors.textLight}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country Code</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    countryCode === item.code && styles.countryItemSelected,
                  ]}
                  onPress={() => {
                    onCountryChange(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryDialCode}>{item.dialCode}</Text>
                  {countryCode === item.code && (
                    <Text style={styles.checkmark}>✓</Text>
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
    fontSize: 16, // unchanged
    color: colors.text,
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
    paddingHorizontal: 20,
    gap: 6,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
  },
  flag: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
  },
  dialCode: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  dropdownIcon: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textLight,
  },

  /** PHONE INPUT **/
  input: {
    flex: 1,
    height: 55,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },

  /** ERROR TEXT **/
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.error,
    marginTop: 4,
  },

  /** MODAL **/
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.white,
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
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.text,
  },
  closeButton: {
    fontFamily: fontFamily.regular,
    fontSize: 24,
    color: colors.textLight,
  },

  /** OPTIONS LIST **/
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  countryItemSelected: {
    backgroundColor: "#F5F0FF",
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
    color: colors.text,
  },
  countryDialCode: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textLight,
    marginRight: spacing.small,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primary,
  },
});

export default PhoneInput;
