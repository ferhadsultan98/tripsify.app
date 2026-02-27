import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import DownArrowIcon from "../../../assets/images/downArrowIcon.svg";
import SearchIcon from "../../../assets/images/searchIcon.svg";
import { useTheme } from "../../context/ThemeContext";

const Select = ({
  label,
  required,
  value,
  options,
  onSelect,
  placeholder,
  icon,
  error,
  searchable = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  const selectedOption = options.find((opt) => opt.value === value);

  // Axtarış funksionallığı
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  // Modal bağlananda axtarışı təmizləmək
  const handleClose = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.textPrimary }]}>
          {label}{" "}
          {required && (
            <Text style={[styles.required, { color: theme.error }]}>*</Text>
          )}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.selectButton,
          { backgroundColor: theme.inputBg },
          error && { borderColor: theme.error, borderWidth: 1 },
        ]}
        onPress={() => setModalVisible(true)}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text
          style={[
            styles.selectText,
            { color: value ? theme.textPrimary : theme.textSecondary },
          ]}
        >
          {selectedOption?.label || placeholder || "Select..."}
        </Text>
        <Text style={[styles.dropdownIcon, { color: theme.textSecondary }]}>
          <DownArrowIcon />
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView
            style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}
          >
            {/* Header */}
            <View
              style={[styles.modalHeader, { borderBottomColor: theme.border }]}
            >
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                {label || "Select"}
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <Text
                  style={[styles.closeButton, { color: theme.textSecondary }]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            {searchable && (
              <View
                style={[
                  styles.searchContainer,
                  { borderBottomColor: theme.border },
                ]}
              >
                <View
                  style={[
                    styles.searchInputWrapper,
                    { backgroundColor: theme.inputBg },
                  ]}
                >
                  {/* İkonun düzgün renderi */}
                  <SearchIcon
                    width={20}
                    height={20}
                    fill={theme.textSecondary}
                    style={{ marginRight: 8 }}
                  />

                  <TextInput
                    style={[styles.searchInput, { color: theme.textPrimary }]}
                    placeholder="Search..."
                    placeholderTextColor={theme.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
                    autoCapitalize="none"
                  />

                  {/* Axtarışı təmizləmə düyməsi (X) */}
                  {searchQuery.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchQuery("")}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text
                        style={{
                          color: theme.textSecondary,
                          fontSize: 18,
                          paddingHorizontal: 5,
                        }}
                      >
                        ✕
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => String(item.value)} // value rəqəm ola bilər, stringə çeviririk
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled" // Klaviatura açıq olanda seçim etməyə imkan verir
              ListEmptyComponent={
                <View style={{ padding: 20, alignItems: "center" }}>
                  <Text
                    style={{
                      color: theme.textSecondary,
                      fontFamily: fontFamily.regular,
                    }}
                  >
                    No results found
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    { borderBottomColor: theme.border },
                    value === item.value && {
                      backgroundColor:
                        theme.mode === "dark" ? "#2C2C2C" : "#F5F0FF",
                    },
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    handleClose();
                  }}
                >
                  {item.icon && (
                    <Text style={styles.optionIcon}>{item.icon}</Text>
                  )}
                  <Text
                    style={[styles.optionText, { color: theme.textPrimary }]}
                  >
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <Text style={[styles.checkmark, { color: theme.primary }]}>
                      ✓
                    </Text>
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
    marginBottom: spacing.small,
  },
  required: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 20,
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
  },
  dropdownIcon: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 11, // error text bir az kiçik olsa daha yaxşı görünür
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%", // Search input əlavə olunduğu üçün hündürlüyü artırdıq
    minHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.horizontal,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
  closeButton: {
    fontFamily: fontFamily.regular,
    fontSize: 22,
    padding: 4,
  },

  // Search Styles
  searchContainer: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    height: "100%",
  },

  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.horizontal,
    paddingVertical: 16, // toxunma sahəsini artırdıq
    borderBottomWidth: 1,
  },
  optionIcon: {
    fontFamily: fontFamily.regular,
    fontSize: 22, // bayraqlar üçün bir az böyütdük
    marginRight: spacing.medium,
  },
  optionText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
});

export default Select;
