import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useTranslation } from 'react-i18next'; // Hook-u import edirik
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { fontFamily, fontSize } from "../../styles/fonts";
import LogoIcon from "../../../assets/images/loginLogo.png";

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation(); // Tərcümə funksiyasını çağırırıq

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Header */}
      <Text style={styles.title}>{t('login_screen.title')}</Text>
      <Text style={styles.subtitle}>
        {t('login_screen.subtitle')}
      </Text>

      {/* Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginFormScreen")}
      >
        <Text style={styles.loginButtonText}>{t('login_screen.login_btn')}</Text>
      </TouchableOpacity>

      {/* SignUp */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("SignUpFormScreen")}
      >
        <Text style={styles.signUpText}>{t('login_screen.signup_btn')}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={styles.footerLink}>{t('login_screen.privacy_policy')}</Text>
        </TouchableOpacity>
        <Text style={styles.footerDot}>·</Text>
        <TouchableOpacity onPress={() => navigation.navigate("TermsOfService")}>
          <Text style={styles.footerLink}>{t('login_screen.terms_of_service')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.xlarge,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.xlarge * 5,
  },
  loginButton: {
    height: 55,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.medium,
    marginTop: spacing.xlarge,
  },
  loginButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
    color: colors.white,
  },
  signUpButton: {
    height: 55,
    borderRadius: 25,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.large,
  },
  signUpText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
    color: colors.text,
  },
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
    color: colors.textLight,
  },
  footerDot: {
    fontFamily: fontFamily.regular,
    color: colors.textLight,
  },
});

export default LoginScreen;
