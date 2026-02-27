import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import ScreenHeader from "../../components/common/ScreenHeader";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const HelpSupportScreen = ({ navigation }) => {
  const { t } = useTranslation(); // Hook
  const { theme } = useTheme(); // Theme Hook

  const options = [
    {
      id: 1,
      title: t('help_support.faq') || "FAQ",
      onPress: () => navigation.navigate("FAQScreen"),
    },
    {
      id: 2,
      title: t('help_support.contact_support') || "Contact Support",
      onPress: () => navigation.navigate("ContactSupportScreen"),
    },
    {
      id: 3,
      title: t('help_support.privacy_policy') || "Privacy Policy",
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      id: 4,
      title: t('help_support.terms_of_service') || "Terms of Service",
      onPress: () => navigation.navigate("TermsOfService"),
    },
    {
      id: 5,
      title: t('help_support.about_us') || "About us",
      onPress: () => navigation.navigate("AboutUsScreen"), 
    },
    {
      id: 6,
      title: t('help_support.rate_us') || "Rate us",
      onPress: () => {
        const url = "https://play.google.com/store/apps/details?id=com.tripsify";
        Linking.openURL(url).catch(err => console.error("Error opening link", err));
      },
    },
    {
      id: 7,
      title: t('help_support.visit_website') || "Visit Our Website",
      onPress: () => {
        Linking.openURL("https://tripsify.com");
      },
    },
    {
      id: 8,
      title: t('help_support.social_media') || "Follow us on Social Media",
      onPress: () => navigation.navigate("SocialMediaScreen"), 
    },
  ];

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <ScreenHeader
          title={t('help_support.title') || "Help & Support"}
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={option.onPress}
            >
              <Text style={[styles.optionText, { color: theme.textPrimary }]}>{option.title}</Text>
              <ChevronRightIcon 
                width={20} 
                height={20} 
                fill={theme.iconColor} 
                style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }} 
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.white, // Dinamik
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
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    fontWeight: "600",
    // color: "#000", // Dinamik
    textAlign: 'left', 
  },
});

export default HelpSupportScreen;
