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
import ScreenHeader from "../../components/common/ScreenHeader";
import PersonalInfoIcon from "../../../assets/images/profileIcon.svg";
import AccountSecurityIcon from "../../../assets/images/accountSecurityIcon.svg";
import PaymentMethodsIcon from "../../../assets/images/paymentIcon.svg";
import AppAppearanceIcon from "../../../assets/images/appearanceIcon.svg";
import HelpSupportIcon from "../../../assets/images/helpSupportIcon.svg";
import LogoutIcon from "../../../assets/images/logoutIcon.svg";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { colors } from "../../styles/colors";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const { width } = Dimensions.get("window");

const SettingsScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const settingsOptions = [
    {
      id: 1,
      title: "Personal Info",
      icon: PersonalInfoIcon,
      onPress: () => navigation.navigate("ProfileEditScreen"),
    },
    {
      id: 2,
      title: "Account & Security",
      icon: AccountSecurityIcon,
      onPress: () => navigation.navigate("AccountSecurityScreen"),
    },
    {
      id: 3,
      title: "Payment Methods",
      icon: PaymentMethodsIcon,
      onPress: () => navigation.navigate("PaymentMethodsScreen"),
    },
    {
      id: 4,
      title: "App Appearance",
      icon: AppAppearanceIcon,
      onPress: () => navigation.navigate("AppAppearanceScreen"),
    },
    {
      id: 5,
      title: "Help & Support",
      icon: HelpSupportIcon,
      onPress: () => navigation.navigate("HelpSupportScreen"),
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Clear user data, tokens, etc.
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <ScreenHeader
          title="Settings"
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.optionsContainer}>
            {settingsOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={option.onPress}
                >
                  <View style={styles.optionLeft}>
                    {/* İkonların rəngini dinamik edirik */}
                    <IconComponent width={20} height={20} stroke={theme.iconColor} fill="none" />
                    <Text style={[styles.optionText, { color: theme.textPrimary }]}>{option.title}</Text>
                  </View>
                  <ChevronRightIcon 
                    width={20} 
                    height={20} 
                    fill={theme.iconColor} 
                    style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => setShowLogoutModal(true)}
          >
            <LogoutIcon width={20} height={20} fill={theme.error} stroke="none" />
            <Text style={[styles.logoutText, { color: theme.error }]}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>

        <LogoutModal
          visible={showLogoutModal}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          theme={theme} // Modala theme ötürürük
        />
      </View>
    </SafeAreaView>
  );
};

const LogoutModal = ({ visible, onCancel, onConfirm, theme }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <Animated.View style={[modalStyles.overlay, { opacity: opacityAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                modalStyles.modalContainer,
                { 
                    transform: [{ scale: scaleAnim }],
                    backgroundColor: theme.cardBg // Dinamik fon
                },
              ]}
            >
              <Text style={[modalStyles.title, { color: theme.error }]}>Logout</Text>
              <Text style={[modalStyles.message, { color: theme.textPrimary }]}>
                Are you sure you want to log out?
              </Text>

              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity 
                    style={[modalStyles.cancelButton, { backgroundColor: theme.inputBg }]} 
                    onPress={onCancel}
                >
                  <Text style={[modalStyles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[modalStyles.confirmButton, { backgroundColor: theme.primary }]} 
                    onPress={onConfirm}
                >
                  <Text style={[modalStyles.confirmText, { color: '#FFFFFF' }]}>Yes, Logout</Text>
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
    // backgroundColor: colors.white, // Dinamik
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 32,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  optionsContainer: {
    gap: 32,
    marginBottom: 32,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#000", // Dinamik
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    // color: "#FF3B30", // Dinamik
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    // backgroundColor: "#FFF", // Dinamik
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    // color: "#FF3B30", // Dinamik
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: "400",
    // color: "#000", // Dinamik
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    // backgroundColor: "#F5F5F5", // Dinamik
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    // color: "#757575", // Dinamik
  },
  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    // backgroundColor: colors.primary, // Dinamik
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    // color: "#FFF", // Dinamik
  },
});

export default SettingsScreen;
