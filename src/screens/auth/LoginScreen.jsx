import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useTranslation } from 'react-i18next';
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import LogoIcon from "../../../assets/images/loginLogo.png";
import { useTheme } from "../../context/ThemeContext";
import AppButton from "../../components/common/AppButton"; // Yeni import

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      showsVerticalScrollIndicator={false}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Header */}
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {t('login_screen.title')}
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {t('login_screen.subtitle')}
      </Text>

      {/* Login Button (Primary) */}
      <AppButton
        title={t('login_screen.login_btn')}
        onPress={() => navigation.navigate("LoginFormScreen")}
        style={{ marginTop: spacing.xlarge, marginBottom: spacing.medium }}
      />

      {/* SignUp Button (Outline) */}
      <AppButton
        title={t('login_screen.signup_btn')}
        variant="outline"
        onPress={() => navigation.navigate("SignUpFormScreen")}
        style={{ marginBottom: spacing.large }}
      />

      {/* Footer Links */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={[styles.footerLink, { color: theme.textSecondary }]}>
            {t('login_screen.privacy_policy')}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.footerDot, { color: theme.textSecondary }]}>·</Text>
        <TouchableOpacity onPress={() => navigation.navigate("TermsOfService")}>
          <Text style={[styles.footerLink, { color: theme.textSecondary }]}>
            {t('login_screen.terms_of_service')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xlarge,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: spacing.xlarge * 5,
    height: 200,
    justifyContent: "center",
  },
  logo: {
    width: 94,
    height: 144,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    textAlign: "center",
    marginBottom: spacing.xlarge,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.xlarge * 5,
  },
  // Button stilləri silindi, çünki AppButton daxilindədir
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xlarge * 2,
    marginBottom: spacing.large,
    gap: spacing.small,
  },
  footerLink: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  footerDot: {
    fontFamily: fontFamily.regular,
  },
});

export default LoginScreen;
