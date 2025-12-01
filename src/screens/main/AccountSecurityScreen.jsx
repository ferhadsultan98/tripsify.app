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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

const { width } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomSwitch = ({ value, onValueChange }) => {
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onValueChange(!value);
  };
  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value ? styles.switchContainerOn : styles.switchContainerOff,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.switchCircle} />
    </TouchableOpacity>
  );
};

const ConfirmationModal = ({ visible, onCancel, onConfirm, content }) => {
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
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  content.action === "delete" && styles.dangerText,
                ]}
              >
                {content.title}
              </Text>
              <Text style={styles.modalSubtitle}>{content.subtitle}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={onCancel}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    content.action === "delete"
                      ? styles.modalButtonDelete
                      : styles.modalButtonConfirm,
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
  const [biometricID, setBiometricID] = useState(false);
  const [faceID, setFaceID] = useState(false);
  const [smsAuthenticator, setSmsAuthenticator] = useState(false);
  const [googleAuthenticator, setGoogleAuthenticator] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = (type) => {
    setModalContent(
      type === "deactivate"
        ? {
            title: "Deactivate Account",
            subtitle:
              "Are you sure you want to deactivate your account? You can reactivate it anytime.",
            confirmText: "Deactivate",
            action: "deactivate",
          }
        : {
            title: "Delete Account",
            subtitle:
              "This is a permanent action and cannot be undone. Are you sure you want to delete your account?",
            confirmText: "Delete",
            action: "delete",
          }
    );
    setModalVisible(true);
  };

  const handleConfirm = () => {
    console.log(`Account ${modalContent.action}d`);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Account & Security"
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Two-Step Verification</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>SMS Authenticator</Text>
            <CustomSwitch
              value={smsAuthenticator}
              onValueChange={setSmsAuthenticator}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Google Authenticator</Text>
            <CustomSwitch
              value={googleAuthenticator}
              onValueChange={setGoogleAuthenticator}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biometric</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Biometric ID</Text>
            <CustomSwitch value={biometricID} onValueChange={setBiometricID} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Face ID</Text>
            <CustomSwitch value={faceID} onValueChange={setFaceID} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => navigation.navigate("DeviceManagementScreen")}
          >
            <View style={styles.navContent}>
              <Text style={styles.navTitle}>Device Management</Text>
            </View>
            <ChevronRightIcon width={20} height={20} fill="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => openModal("deactivate")}
          >
            <View style={styles.navContent}>
              <Text style={styles.navTitle}>Deactivate Account</Text>
            </View>
            <ChevronRightIcon width={20} height={20} fill="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navRow}
            onPress={() => openModal("delete")}
          >
            <View style={styles.navContent}>
              <Text style={[styles.navTitle, styles.dangerText]}>
                Delete Account
              </Text>
            </View>
            <ChevronRightIcon width={20} height={20} fill="#FF3B30" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ConfirmationModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        content={modalContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, gap: 16 },
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#757575",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  toggleLabel: { fontFamily: fontFamily.regular, fontSize: 16, color: "#000" },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  navContent: { flex: 1 },
  navTitle: { fontFamily: fontFamily.semiBold, fontSize: 16, color: "#000" },
  dangerText: { color: "#FF3B30" },
  switchContainer: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  switchContainerOn: {
    backgroundColor: colors.primary,
    alignItems: "flex-end",
  },
  switchContainerOff: { backgroundColor: "#E0E0E0", alignItems: "flex-start" },
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
  modalTitle: { fontFamily: fontFamily.bold, fontSize: 18, color: "#000" },
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
  modalButtonConfirm: { backgroundColor: colors.primary },
  modalButtonDelete: { backgroundColor: "#FF3B30" },
  modalButtonTextConfirm: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFF",
  },
});

export default AccountSecurityScreen;
