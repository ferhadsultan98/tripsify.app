import React, { useState, useEffect, useRef } from "react";
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
import { useTranslation } from "react-i18next"; // i18next import
import RNRestart from "react-native-restart"; // Restart paketi
import ScreenHeader from "../../components/common/ScreenHeader";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

const { height } = Dimensions.get("window");

const AppAppearanceScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation(); // Tərcümə hook-u

  // Dil kodlarını oxunaqlı adlara çevirmək üçün
  const getLanguageLabel = (code) => {
    switch (code) {
      case "en": return "English (US)";
      case "az": return "Azərbaycanca";
      case "tr": return "Türkçe";
      case "ru": return "Русский";
      case "ar": return "العربية";
      default: return "English (US)";
    }
  };

  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState(i18n.language); // Cari dili default olaraq seç
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const themeOptions = [
    { value: "System Default", label: "System Default" },
    { value: "Light", label: "Light" },
    { value: "Dark", label: "Dark" },
  ];

  // Bizim i18n kodlarına uyğun dil seçimləri
  const languageOptions = [
    { value: "en", label: "English (US)" },
    { value: "az", label: "Azərbaycanca" },
    { value: "tr", label: "Türkçe" },
    { value: "ru", label: "Русский" },
    { value: "ar", label: "العربية" },
    { value: "ua", label: "Українська" },
  ];

  // Dili dəyişən əsas funksiya
  const handleLanguageChange = async (langCode) => {
    setLanguage(langCode);
    
    // 1. Dili dəyişirik
    await i18n.changeLanguage(langCode);

    // 2. RTL yoxlanışı
    const isRTL = langCode === "ar";
    
    // Əgər RTL vəziyyəti dəyişirsə, tətbiqi restart edirik
    if (isRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        setTimeout(() => {
            RNRestart.Restart();
        }, 500);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScreenHeader
          title={t("appearance_screen.title") || "App Appearance"} // Tərcümə əlavə etdim
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Theme */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setShowThemeModal(true)}
          >
            <Text style={styles.optionLabel}>{t("appearance_screen.theme") || "Theme"}</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>{theme}</Text>
              <ChevronRightIcon width={20} height={20} fill="#000" style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }} /> 
            </View>
          </TouchableOpacity>

          {/* App Language */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.optionLabel}>{t("appearance_screen.language") || "App Language"}</Text>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>{getLanguageLabel(language)}</Text>
              <ChevronRightIcon width={20} height={20} fill="#000" style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }} />
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Theme BottomSheet */}
        <BottomSheet
          visible={showThemeModal}
          onClose={() => setShowThemeModal(false)}
          title={t("appearance_screen.choose_theme") || "Choose Theme"}
          options={themeOptions}
          selectedValue={theme}
          onSelect={setTheme}
        />

        {/* Language BottomSheet */}
        <BottomSheet
          visible={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
          title={t("appearance_screen.choose_language") || "Choose Language"}
          options={languageOptions}
          selectedValue={language}
          onSelect={handleLanguageChange} // Dəyişdirilmiş funksiya
        />
      </View>
    </SafeAreaView>
  );
};

// BottomSheet Component (Olduğu kimi qalır, sadəcə funksionallıq inteqrasiya olunub)
const BottomSheet = ({ visible, onClose, title, options, selectedValue, onSelect }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

  const handleSelect = (value) => {
    onSelect(value);
    // onClose(); // Buranı bağladım ki, OK düyməsi ilə təsdiqlənsin (istəyə bağlı aça bilərsən)
  };

  // Yeni state saxlayırıq ki, istifadəçi seçib sonra OK desin
  const [tempSelected, setTempSelected] = useState(selectedValue);

  useEffect(() => {
      setTempSelected(selectedValue);
  }, [visible, selectedValue]);


  const handleOkPress = () => {
      onSelect(tempSelected);
      onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[sheetStyles.overlay, { opacity: opacityAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                sheetStyles.sheetContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={sheetStyles.handle} />
              <Text style={sheetStyles.title}>{title}</Text>

              <View style={sheetStyles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={sheetStyles.optionRow}
                    onPress={() => setTempSelected(option.value)}
                  >
                    <View style={sheetStyles.radioOuter}>
                      {tempSelected === option.value && (
                        <View style={sheetStyles.radioInner} />
                      )}
                    </View>
                    <Text style={sheetStyles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={sheetStyles.buttonContainer}>
                <TouchableOpacity style={sheetStyles.cancelButton} onPress={onClose}>
                  <Text style={sheetStyles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={sheetStyles.okButton} onPress={handleOkPress}>
                  <Text style={sheetStyles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
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
    paddingTop: 24,
    paddingBottom: 100,
    gap: 28,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    textAlign: "left", // RTL dəstəyi üçün
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  optionValue: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    fontWeight: "400",
    color: "#757575",
  },
});

const sheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFF",
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
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
  },

  optionsContainer: {
    gap: 20,
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    textAlign: "left",
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: "#757575",
  },
  okButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  okText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default AppAppearanceScreen;
