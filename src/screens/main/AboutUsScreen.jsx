import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";
import { useTranslation } from "react-i18next";
import ScreenHeader from "../../components/common/ScreenHeader";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

// --- Assets ---
import LogoIcon from "../../../assets/images/loginLogo.png";
import ShieldIcon from "../../../assets/images/accountSecurityIcon.svg";
import TagIcon from "../../../assets/images/ageIcon.svg";
import GlobeIcon from "../../../assets/images/airplaneIcon.svg";

// Komanda Şəkilləri (Placeholder)
const teamMember1 = require("../../../assets/images/backIcon.svg");
const teamMember2 = require("../../../assets/images/calendarIcon.svg");
const teamMember3 = require("../../../assets/images/callIcon.svg");

// Sosial Media Placeholder
import InstagramIcon from "../../../assets/images/instagramIcon.svg";
import FacebookIcon from "../../../assets/images/infoIcon.svg";
import WebsiteIcon from "../../../assets/images/logoutIcon.svg";

// --- Alt Komponentlər ---
const FeatureItem = ({ Icon, title, text, theme }) => (
  <View style={styles.featureItem}>
    <View
      style={[styles.featureIconContainer, { backgroundColor: theme.inputBg }]}
    >
      <Icon width={24} height={24} color={theme.primary} />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.featureText, { color: theme.textSecondary }]}>
        {text}
      </Text>
    </View>
  </View>
);

const TeamMemberCard = ({ item, theme }) => (
  <View style={[styles.teamCard, { backgroundColor: theme.cardBg }]}>
    <Image
      source={item.photo}
      style={[styles.teamPhoto, { borderColor: theme.primary }]}
      resizeMode="contain"
    />
    <Text style={[styles.teamName, { color: theme.textPrimary }]}>
      {item.name}
    </Text>
    <Text style={[styles.teamRole, { color: theme.textSecondary }]}>
      {item.role}
    </Text>
  </View>
);

const AboutUsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Theme Hook
  const appVersion = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err),
    );
  };

  const team = [
    {
      id: "1",
      name: "John Doe",
      role: t("about_us.team_roles.ceo"),
      photo: teamMember1,
    },
    {
      id: "2",
      name: "Jane Smith",
      role: t("about_us.team_roles.ops"),
      photo: teamMember2,
    },
    {
      id: "3",
      name: "Sam Wilson",
      role: t("about_us.team_roles.dev"),
      photo: teamMember3,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScreenHeader
        title={t("about_us.title")}
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header & Version */}
        <View style={styles.headerSection}>
          <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.appName, { color: theme.textPrimary }]}>
            Tripsify
          </Text>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            v{appVersion} (Build {buildNumber})
          </Text>
        </View>

        {/* 2. Our Story (Missiya) */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {t("about_us.our_story_title")}
          </Text>
          <Text style={[styles.bodyText, { color: theme.textSecondary }]}>
            {t("about_us.our_story_text")}
          </Text>
        </View>

        {/* 3. What We Stand For (Dəyərlər) */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {t("about_us.values_title")}
          </Text>
          <FeatureItem
            Icon={GlobeIcon}
            title={t("about_us.values.1.title")}
            text={t("about_us.values.1.text")}
            theme={theme}
          />
          <FeatureItem
            Icon={TagIcon}
            title={t("about_us.values.2.title")}
            text={t("about_us.values.2.text")}
            theme={theme}
          />
          <FeatureItem
            Icon={ShieldIcon}
            title={t("about_us.values.3.title")}
            text={t("about_us.values.3.text")}
            theme={theme}
          />
        </View>

        {/* 4. Team Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {t("about_us.team_title")}
          </Text>
          <FlatList
            data={team}
            renderItem={({ item }) => (
              <TeamMemberCard item={item} theme={theme} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 0 }}
          />
        </View>

        {/* 5. Connect with Us */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {t("about_us.connect_with_us")}
          </Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[
                styles.socialItem,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
              onPress={() => openLink("https://instagram.com/tripsify")}
            >
              <View style={[styles.tempIcon, { backgroundColor: "#E1306C" }]} />
              <Text style={[styles.socialText, { color: theme.textPrimary }]}>
                Instagram
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialItem,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
              onPress={() => openLink("https://twitter.com/tripsify")}
            >
              <View style={[styles.tempIcon, { backgroundColor: "#1DA1F2" }]} />
              <Text style={[styles.socialText, { color: theme.textPrimary }]}>
                Twitter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialItem,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
              onPress={() => openLink("https://tripsify.com")}
            >
              <View
                style={[styles.tempIcon, { backgroundColor: theme.primary }]}
              />
              <Text style={[styles.socialText, { color: theme.textPrimary }]}>
                Website
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. Legal Links */}
        <View style={styles.legalSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TermsOfService")}
          >
            <Text style={[styles.legalLink, { color: theme.primary }]}>
              {t("about_us.terms")}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.dot, { color: theme.textSecondary }]}>•</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <Text style={[styles.legalLink, { color: theme.primary }]}>
              {t("about_us.privacy")}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.copyRight, { color: theme.textSecondary }]}>
          © {new Date().getFullYear()} Tripsify Inc. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  // Header
  headerSection: { alignItems: "center", marginTop: 20, marginBottom: 32 },
  logo: { width: 80, height: 80, marginBottom: 16 },
  appName: { fontFamily: fontFamily.bold, fontSize: 24, marginBottom: 4 },
  versionText: { fontFamily: fontFamily.regular, fontSize: 14 },

  // Sections
  section: { marginBottom: 32 },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    marginBottom: 16,
    textAlign: "left",
  },
  bodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "left",
  },

  // Features
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureTextContainer: { flex: 1 },
  featureTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    marginBottom: 4,
    textAlign: "left",
  },
  featureText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
  },

  // Team
  teamCard: { width: 140, alignItems: "center", padding: 16, borderRadius: 16 },
  teamPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
  },
  teamName: { fontFamily: fontFamily.bold, fontSize: 15, textAlign: "center" },
  teamRole: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    textAlign: "center",
  },

  // Social
  socialRow: { flexDirection: "row", gap: 16 },
  socialItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  tempIcon: { width: 24, height: 24, borderRadius: 12, marginBottom: 8 },
  socialText: { fontFamily: fontFamily.medium, fontSize: 12 },

  // Legal
  legalSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  legalLink: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    textDecorationLine: "underline",
  },
  dot: {},
  copyRight: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    textAlign: "center",
  },
});

export default AboutUsScreen;
