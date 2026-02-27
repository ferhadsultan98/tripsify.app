import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import MessageIcon from "../../../assets/images/message.svg";
import WhatsappIcon from "../../../assets/images/whatsapp.svg";
import CallIcon from "../../../assets/images/callIcon.svg";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const SignUpVerificationScreen = ({ navigation, route }) => {
  const { theme } = useTheme(); // Theme Hook
  const { phoneNumber, email, currentStep, totalSteps } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = (selectedOption) => {
    setSelectedMethod(selectedOption);

    navigation.navigate("VerificationCodeScreen", {
      phoneNumber,
      email,
      method: "phone",
      verificationMethod: selectedOption,
      currentStep: (currentStep || 2) + 1,
      totalSteps: totalSteps || 6,
      flow: "register",
    });
  };

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <ScreenHeader
          onBackPress={() => navigation.goBack()}
          currentStep={currentStep || 2}
          totalSteps={totalSteps || 6}
          showProgress={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentWrapper}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Choose a verification method
              </Text>

              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                The verification code will be sent to this number:
              </Text>
              <Text style={[styles.contactInfo, { color: theme.primary }]}>
                {phoneNumber || "+994502122237"}
              </Text>
            </View>

            {/* Options Section */}
            <View style={styles.optionsSection}>
              {/* SMS Option */}
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  { borderColor: theme.border, backgroundColor: theme.cardBg }, // Default dinamik
                  selectedMethod === "sms" && {
                    borderColor: theme.primary,
                    backgroundColor:
                      theme.mode === "dark" ? "#2C2C2C" : "#F5F0FF", // Seçiləndə fon
                  },
                ]}
                onPress={() => handleMethodSelect("sms")}
              >
                <View style={styles.iconContainer}>
                  <MessageIcon
                    width={24}
                    height={24}
                    fill={theme.textPrimary}
                  />
                  {/* İkon rəngi dinamik ola bilər, əgər SVG dəstəkləyirsə */}
                </View>
                <Text style={[styles.optionText, { color: theme.textPrimary }]}>
                  Get code with SMS
                </Text>
              </TouchableOpacity>

              {/* WhatsApp Option */}
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  { borderColor: theme.border, backgroundColor: theme.cardBg },
                  selectedMethod === "whatsapp" && {
                    borderColor: theme.primary,
                    backgroundColor:
                      theme.mode === "dark" ? "#2C2C2C" : "#F5F0FF",
                  },
                ]}
                onPress={() => handleMethodSelect("whatsapp")}
              >
                <View style={styles.iconContainer}>
                  <WhatsappIcon width={24} height={24} />
                  {/* WhatsApp ikonu adətən öz rəngində qalır */}
                </View>
                <Text style={[styles.optionText, { color: theme.textPrimary }]}>
                  Get code with WhatsApp
                </Text>
              </TouchableOpacity>

              {/* Call Option */}
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  { borderColor: theme.border, backgroundColor: theme.cardBg },
                  selectedMethod === "call" && {
                    borderColor: theme.primary,
                    backgroundColor:
                      theme.mode === "dark" ? "#2C2C2C" : "#F5F0FF",
                  },
                ]}
                onPress={() => handleMethodSelect("call")}
              >
                <View style={styles.iconContainer}>
                  <CallIcon width={24} height={24} fill={theme.textPrimary} />
                </View>
                <Text style={[styles.optionText, { color: theme.textPrimary }]}>
                  Get code with Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    alignItems: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 382,
    gap: 24,
  },
  headerSection: {
    flexDirection: "column",
    gap: 12,
    alignSelf: "center",
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    // color: colors.text, // Dinamik
    alignSelf: "center",
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: "#616161", // Dinamik
    alignSelf: "center",
    textAlign: "center",
  },
  contactInfo: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: "#8D62D7", // Dinamik
    alignSelf: "center",
  },
  optionsSection: {
    flexDirection: "column",
    gap: 12,
    paddingTop: 16,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 1000, // Pill shape
    padding: 16,
    borderWidth: 1,
    // borderColor: "#EEE", // Dinamik
    width: "100%",
  },
  optionCardSelected: {
    // borderColor: colors.primary, // Dinamik inline
    // backgroundColor: "#F5F0FF", // Dinamik inline
  },
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    textAlign: "center",
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
});

export default SignUpVerificationScreen;
