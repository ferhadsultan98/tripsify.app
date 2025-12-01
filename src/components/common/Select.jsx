import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import DownArrowIcon from "../../../assets/images/downArrowIcon.svg";

const Select = ({
  label,
  required,
  value,
  options,
  onSelect,
  placeholder,
  icon,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.selectButton, error && styles.selectError]}
        onPress={() => setModalVisible(true)}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {selectedOption?.label || placeholder || "Select..."}
        </Text>
        <Text style={styles.dropdownIcon}>
          <DownArrowIcon />
        </Text>
      </TouchableOpacity>

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
              <Text style={styles.modalTitle}>{label || "Select"}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    value === item.value && styles.optionItemSelected,
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  {item.icon && (
                    <Text style={styles.optionIcon}>{item.icon}</Text>
                  )}
                  <Text style={styles.optionText}>{item.label}</Text>
                  {value === item.value && (
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

  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.small,
  },
  required: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.error,
  },

  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F2F2F2",
  },
  selectError: {
    borderColor: colors.error,
  },
  icon: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginRight: spacing.small,
  },

  selectText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    fontFamily: fontFamily.regular,
    color: colors.textLight,
  },

  dropdownIcon: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textLight,
  },

  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.error,
    marginTop: 4,
  },

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

  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  optionItemSelected: {
    backgroundColor: "#F5F0FF",
  },
  optionIcon: {
    fontFamily: fontFamily.regular,
    fontSize: 20,
    marginRight: spacing.medium,
  },
  optionText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primary,
  },
});

export default Select;
