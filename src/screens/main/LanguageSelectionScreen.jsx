import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  I18nManager
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import RNRestart from "react-native-restart";
import ScreenHeader from "../../components/common/ScreenHeader";
import CheckIcon from "../../../assets/images/checkIcon.svg"; // Check ikonunuz (əgər varsa)
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

// Bayraqları SVG kimi import edə bilərsiniz. Nümunə:
// import AzFlag from "../../../assets/images/flags/az.svg";
// import EnFlag from "../../../assets/images/flags/gb.svg";

const LanguageSelectionScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languages = [
    { code: "az", label: "Azərbaycanca", flag: "🇦🇿" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "عربي", flag: "🇦🇪" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  ];

  const handleLanguageSelect = async (langCode) => {
    setSelectedLanguage(langCode);
    
    // Dili dəyiş
    await i18n.changeLanguage(langCode);

    // RTL yoxlanışı və Restart
    const isRTL = langCode === "ar";
    if (isRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        setTimeout(() => {
            RNRestart.Restart();
        }, 500);
    } else {
        // RTL dəyişməyibsə, sadəcə geri qayıtmaq olar
        // navigation.goBack(); // İstəyə bağlı
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title={t("appearance_screen.language") || "App Language"}
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageCard,
                isSelected && styles.languageCardSelected // Seçiləndə border rəngi dəyişir
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
              activeOpacity={0.8}
            >
              <View style={styles.leftContainer}>
                {/* Bayraq İkonu */}
                <View style={styles.flagContainer}>
                    {/* SVG istifadə edirsinizsə: <lang.flagComponent width={28} height={20} /> */}
                    <Text style={{fontSize: 24}}>{lang.flag}</Text> 
                </View>
                
                <Text style={styles.languageText}>{lang.label}</Text>
              </View>

              {isSelected && (
                // Burda öz check ikonunuzu istifadə edin
                <View style={styles.checkIcon}>
                   {/* <CheckIcon width={24} height={24} fill={colors.primary} /> */}
                   <Text style={{color: colors.primary, fontWeight: 'bold'}}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16, // Kartlar arası məsafə
  },
  languageCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,     // padding: 12px 24px (şəkildəki kimi, mobile uyğunlaşdırılıb)
    paddingHorizontal: 16,
    backgroundColor: "#FFF", // background: var(--surface-light-dark-light-3, #FFF);
    borderRadius: 10,        // border-radius: 10px;
    borderWidth: 1,
    borderColor: "#E0E0E0",  // Default border rəngi (boz)
    
    // Shadow (Kölgə) - İstəyə bağlı
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  languageCardSelected: {
    borderColor: "#573C84",  // border: 2px solid #573C84; (Sizin rəng)
    borderWidth: 2,          // Seçiləndə qalınlıq artır
    backgroundColor: "#F8F5FF" // Seçiləndə arxa fon bir az bənövşəyi olsun (opsional)
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Bayraq və yazı arası
  },
  flagContainer: {
    width: 32,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Bayraq şəkli üçün border radius əlavə edə bilərsiniz
    borderRadius: 4, 
    overflow: 'hidden',
  },
  languageText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#000",
  },
  checkIcon: {
    // Check ikonu üçün stil
  }
});

export default LanguageSelectionScreen;
