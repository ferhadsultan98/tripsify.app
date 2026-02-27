// src/screens/AppAppearanceScreen.jsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import ScreenHeader from "../../components/common/ScreenHeader";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { fontFamily } from "../../styles/fonts";

// YENİ: Theme Hook-u import edirik
import { useTheme } from "../../context/ThemeContext";

const { height } = Dimensions.get("window");

const AppAppearanceScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  // Context-dən theme və funksiyanı götürürük
  const { theme, themeMode, updateTheme } = useTheme();

  const [showThemeModal, setShowThemeModal] = useState(false);

  const themeOptions = [
    { value: "system", label: "System Default" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  const getCurrentThemeLabel = () => {
    const option = themeOptions.find((opt) => opt.value === themeMode);
    return option ? option.label : "System Default";
  };

  return (
    // Background rəngi dinamik oldu: theme.background
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScreenHeader
        title={t("appearance_screen.title") || "App Appearance"}
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* THEME SEÇİMİ */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setShowThemeModal(true)}
        >
          {/* Mətn rəngi dinamik: theme.textPrimary */}
          <Text style={[styles.optionLabel, { color: theme.textPrimary }]}>
            {t("appearance_screen.theme") || "Theme"}
          </Text>
          <View style={styles.optionRight}>
            {/* Alt mətn rəngi dinamik: theme.textSecondary */}
            <Text style={[styles.optionValue, { color: theme.textSecondary }]}>
              {getCurrentThemeLabel()}
            </Text>
            {/* İkon rəngi dinamik: theme.iconColor */}
            <ChevronRightIcon
              width={20}
              height={20}
              fill={theme.iconColor}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </View>
        </TouchableOpacity>

        {/* DIL SEÇİMİ */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("LanguageSelectionScreen")}
        >
          <Text style={[styles.optionLabel, { color: theme.textPrimary }]}>
            {t("appearance_screen.language") || "App Language"}
          </Text>
          <View style={styles.optionRight}>
            <Text style={[styles.optionValue, { color: theme.textSecondary }]}>
              {i18n.language === "en"
                ? "English"
                : i18n.language === "az"
                ? "Azərbaycanca"
                : i18n.language === "ru"
                ? "Русский"
                : i18n.language}
            </Text>
            <ChevronRightIcon
              width={20}
              height={20}
              fill={theme.iconColor}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL */}
      <BottomSheet
        visible={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title={t("appearance_screen.choose_theme") || "Choose Theme"}
        options={themeOptions}
        selectedValue={themeMode}
        onSelect={updateTheme} // Context-dəki funksiyanı çağırırıq
        theme={theme} // Theme obyektini prop kimi ötürürük
      />
    </SafeAreaView>
  );
};

// BottomSheet komponentini də dinamikləşdiririk
const BottomSheet = ({
  visible,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
  theme,
}) => {
  // ... Animasiya kodları eynidir ...
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[sheetStyles.overlay, { opacity: opacityAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                sheetStyles.sheetContainer,
                {
                  transform: [{ translateY: slideAnim }],
                  backgroundColor: theme.cardBg, // Dinamik fon
                },
              ]}
            >
              <View
                style={[sheetStyles.handle, { backgroundColor: theme.border }]}
              />
              <Text style={[sheetStyles.title, { color: theme.textPrimary }]}>
                {title}
              </Text>

              <View style={sheetStyles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={sheetStyles.optionRow}
                    onPress={() => {
                      onSelect(option.value);
                      onClose();
                    }}
                  >
                    <View
                      style={[
                        sheetStyles.radioOuter,
                        { borderColor: theme.primary },
                      ]}
                    >
                      {selectedValue === option.value && (
                        <View
                          style={[
                            sheetStyles.radioInner,
                            { backgroundColor: theme.primary },
                          ]}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        sheetStyles.optionText,
                        { color: theme.textPrimary },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, gap: 28 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: "left",
  },
  optionRight: { flexDirection: "row", alignItems: "center", gap: 16 },
  optionValue: { fontFamily: fontFamily.regular, fontSize: 15 },
});

const sheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: height * 0.7,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
  },
  optionsContainer: { gap: 20 },
  optionRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  optionText: { fontFamily: fontFamily.regular, fontSize: 16 },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
});

export default AppAppearanceScreen;
