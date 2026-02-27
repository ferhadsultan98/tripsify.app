import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import { useTranslation } from "react-i18next";
import ScreenHeader from "../../components/common/ScreenHeader";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook
import { useSettings } from '../../context/SettingsContext'; // Settings Hook
import DeviceInfo from "react-native-device-info"; 

const { width } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const rnBiometrics = new ReactNativeBiometrics();

const CustomSwitch = ({ value, onValueChange, disabled, theme }) => {
  const handlePress = () => {
    if (disabled) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onValueChange();
  };
  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value
          ? { backgroundColor: theme.primary, alignItems: "flex-end" }
          : { backgroundColor: theme.border, alignItems: "flex-start" },
        disabled && { opacity: 0.5 },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.switchCircle} />
    </TouchableOpacity>
  );
};

const ConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  content,
  theme,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = visible ? 1 : 0;
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  if (!visible && scaleAnim._value === 0) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <Animated.View style={[styles.modalOverlay, { opacity: opacityAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ scale: scaleAnim }],
                  backgroundColor: theme.cardBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  { color: theme.textPrimary },
                  content.action === "delete" && styles.dangerText,
                ]}
              >
                {content.title}
              </Text>
              <Text
                style={[styles.modalSubtitle, { color: theme.textSecondary }]}
              >
                {content.subtitle}
              </Text>
              <View style={styles.modalButtons}>
                {content.cancelText && (
                  <TouchableOpacity
                    style={[
                      styles.modalButtonCancel,
                      { backgroundColor: theme.inputBg },
                    ]}
                    onPress={onCancel}
                  >
                    <Text
                      style={[
                        styles.modalButtonText,
                        { color: theme.textPrimary },
                      ]}
                    >
                      {content.cancelText}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    content.action === "delete"
                      ? styles.modalButtonDelete
                      : { backgroundColor: theme.primary },
                  ]}
                  onPress={onConfirm}
                >
                  <Text style={styles.modalButtonTextConfirm}>
                    {content.confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const AccountSecurityScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Theme Hook
const {
  biometricID, updateBiometricID,
  faceID, updateFaceID,
  smsAuthenticator, updateSmsAuthenticator,
  googleAuthenticator, updateGoogleAuthenticator,
} = useSettings();
  // Hər ikisi üçün ayrı state
//   const [biometricID, setBiometricID] = useState(false);
//   const [faceID, setFaceID] = useState(false);
// const [smsAuthenticator, setSmsAuthenticator] = useState(false);
//   const [googleAuthenticator, setGoogleAuthenticator] = useState(false);
  // Cihazın nəyi dəstəklədiyi
  const [supportedBiometry, setSupportedBiometry] = useState(null);

  
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // 1. Cihazın biometrik tipini yoxla
  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const { available, biometryType } =
          await rnBiometrics.isSensorAvailable();
        if (available) {
          setSupportedBiometry(biometryType); // 'TouchID', 'FaceID', 'Biometrics'
        } else {
          setSupportedBiometry(null);
        }
      } catch (error) {
        setSupportedBiometry(null);
      }
    };
    checkBiometrics();
  }, []);

  // 2. Toggle Funksiyası (Ümumi)
  const [biometricModalVisible, setBiometricModalVisible] = useState(false);
  const [biometricModalContent, setBiometricModalContent] = useState({});

  const handleBiometricToggle = async (type, currentState, setState) => {
    if (currentState) {
      setState(false);
      return;
    }

    try {
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();

      if (!available) {
        setBiometricModalContent({
          title: "Not Available",
          subtitle:
            "Biometric authentication is not available on this device or simulator.",
          confirmText: "OK",
          cancelText: null,
          action: "info",
        });
        setBiometricModalVisible(true);
        return;
      }

      if (type === "FaceID" && biometryType !== BiometryTypes.FaceID) {
        setBiometricModalContent({
          title: "Face ID Not Available",
          subtitle: "Your device does not support Face ID.",
          confirmText: "OK",
          cancelText: null,
          action: "info",
        });
        setBiometricModalVisible(true);
        return;
      }

      if (type === "BiometricID" && biometryType === BiometryTypes.FaceID) {
        setBiometricModalContent({
          title: "Fingerprint Not Available",
          subtitle: "Your device does not support fingerprint authentication.",
          confirmText: "OK",
          cancelText: null,
          action: "info",
        });
        setBiometricModalVisible(true);
        return;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: "Confirm your identity",
        cancelButtonText: "Cancel",
      });

      setState(success);
    } catch (error) {
      setState(false);
    }
  };

  const openModal = (type) => {
    setModalContent(
      type === "deactivate"
        ? {
            title: t("security.deactivate_title") || "Deactivate Account",
            subtitle: t("security.deactivate_subtitle") || "Are you sure?",
            confirmText: t("security.deactivate_confirm") || "Deactivate",
            cancelText: t("security.cancel") || "Cancel",
            action: "deactivate",
          }
        : {
            title: t("security.delete_title") || "Delete Account",
            subtitle: t("security.delete_subtitle") || "Permanently delete?",
            confirmText: t("security.delete_confirm") || "Delete",
            cancelText: t("security.cancel") || "Cancel",
            action: "delete",
          },
    );
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScreenHeader
        title={t("security.title") || "Account & Security"}
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {t("security.two_step_verification") || "Two-Step Verification"}
          </Text>
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
              {t("security.sms_authenticator") || "SMS Authenticator"}
            </Text>
            <CustomSwitch
              value={smsAuthenticator}
              onValueChange={() => setSmsAuthenticator(!smsAuthenticator)}
              theme={theme}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
              {t("security.google_authenticator") || "Google Authenticator"}
            </Text>
            <CustomSwitch
              value={googleAuthenticator}
              onValueChange={() => setGoogleAuthenticator(!googleAuthenticator)}
              theme={theme}
            />
          </View>
        </View>

        {/* BIOMETRIC SECTION - Hər ikisi görünür */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {t("security.biometric") || "Biometric"}
          </Text>

          {/* 1. Biometric ID (Fingerprint / TouchID) */}
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
              {t("security.biometric_id") || "Biometric ID"}
            </Text>
            <CustomSwitch
              value={biometricID}
              onValueChange={() =>
                handleBiometricToggle(
                  "BiometricID",
                  biometricID,
                  setBiometricID,
                )
              }
              theme={theme}
            />
          </View>

          {/* 2. Face ID */}
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
              {t("security.face_id") || "Face ID"}
            </Text>
            <CustomSwitch
              value={faceID}
              onValueChange={() =>
                handleBiometricToggle("FaceID", faceID, setFaceID)
              }
              theme={theme}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {t("security.account") || "Account"}
          </Text>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate("DeviceManagementScreen")}
          >
            <View style={styles.navContent}>
              <Text style={[styles.navTitle, { color: theme.textPrimary }]}>
                {t("security.device_management") || "Device Management"}
              </Text>
            </View>
            <ChevronRightIcon
              width={20}
              height={20}
              fill={theme.iconColor}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => openModal("deactivate")}
          >
            <View style={styles.navContent}>
              <Text style={[styles.navTitle, { color: theme.textPrimary }]}>
                {t("security.deactivate_account") || "Deactivate Account"}
              </Text>
            </View>
            <ChevronRightIcon
              width={20}
              height={20}
              fill={theme.iconColor}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => openModal("delete")}
          >
            <View style={styles.navContent}>
              <Text style={[styles.navTitle, styles.dangerText]}>
                {t("security.delete_account") || "Delete Account"}
              </Text>
            </View>
            <ChevronRightIcon
              width={20}
              height={20}
              fill={theme.error}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={biometricModalVisible}
        onCancel={() => setBiometricModalVisible(false)}
        onConfirm={() => setBiometricModalVisible(false)}
        content={biometricModalContent}
        theme={theme}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
    paddingBottom: 40,
  },
  section: { gap: 8, marginBottom: 16 },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    marginBottom: 8,
    textTransform: "uppercase",
    textAlign: "left",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  toggleLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: "left",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  navContent: { flex: 1 },
  navTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    textAlign: "left",
  },
  dangerText: { color: "#FF3B30" },
  switchContainer: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  // switchContainerOn: { backgroundColor: colors.primary, alignItems: "flex-end" }, // Inline stillərə köçürüldü
  // switchContainerOff: { backgroundColor: "#E0E0E0", alignItems: "flex-start" }, // Inline stillərə köçürüldü
  switchCircle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: "white",
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  modalSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 12,
  },
  modalButtons: { flexDirection: "row", gap: 12, width: "100%" },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonCancel: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  modalButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#000",
  },
  // modalButtonConfirm: { backgroundColor: colors.primary }, // Inline stilə köçürüldü
  modalButtonDelete: { backgroundColor: "#FF3B30" },
  modalButtonTextConfirm: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFF",
  },
});

export default AccountSecurityScreen;
