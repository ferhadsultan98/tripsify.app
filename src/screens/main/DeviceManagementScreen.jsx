import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import PhoneIcon from "../../../assets/images/phoneIcon.svg";
import DesktopIcon from "../../../assets/images/desktopIcon.svg";

// Hər bir cihaz üçün list item komponenti
const DeviceItem = ({ device, isCurrent, onLogout }) => {
  const Icon = device.type === "mobile" ? PhoneIcon : DesktopIcon;

  return (
    <View style={styles.deviceItem}>
      <View style={styles.deviceIconContainer}>
        <Icon width={28} height={28} color={colors.primary} />
      </View>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceMeta}>
          {device.location} • {device.lastActive}
        </Text>
      </View>
      {isCurrent ? (
        <Text style={styles.currentDeviceText}>Active now</Text>
      ) : (
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const DeviceManagementScreen = ({ navigation }) => {
  // Nümunə məlumatlar (real tətbiqdə API-dən gəlməlidir)
  const [devices, setDevices] = useState([
    {
      id: "1",
      type: "mobile",
      name: "iPhone 14 Pro Max",
      location: "Baku, Azerbaijan",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      type: "desktop",
      name: "Chrome on Windows",
      location: "Ganja, Azerbaijan",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      type: "mobile",
      name: "Samsung Galaxy S23",
      location: "Sumgait, Azerbaijan",
      lastActive: "Yesterday",
    },
  ]);

  // Tək bir cihazdan çıxış
  const handleLogout = (deviceId) => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out from this device?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          onPress: () =>
            setDevices((prev) => prev.filter((d) => d.id !== deviceId)),
          style: "destructive",
        },
      ],
    );
  };

  // Bütün digər cihazlardan çıxış
  const handleLogoutAll = () => {
    Alert.alert(
      "Log Out Everywhere?",
      "This will log you out from all other devices. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => setDevices((prev) => prev.filter((d) => d.isCurrent)),
          style: "destructive",
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Device Management"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Where you're logged in</Text>

        <View style={styles.deviceList}>
          {devices.map((device, index) => (
            <DeviceItem
              key={device.id}
              device={device}
              isCurrent={device.isCurrent || false}
              onLogout={() => handleLogout(device.id)}
            />
          ))}
        </View>

        {devices.length > 1 && (
          <TouchableOpacity
            style={styles.logoutAllButton}
            onPress={handleLogoutAll}
          >
            <Text style={styles.logoutAllButtonText}>
              Log out of all other sessions
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.text,
    marginBottom: 20,
  },
  deviceList: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  deviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E9EAFB", // İkon üçün açıq fon
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  deviceInfo: {
    flex: 1,
    gap: 4,
  },
  deviceName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  deviceMeta: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "#757575",
  },
  currentDeviceText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#2E7D32", // Yaşıl rəng
  },
  logoutButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#D32F2F", // Qırmızı rəng
  },
  logoutAllButton: {
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    alignItems: "center",
  },
  logoutAllButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#D32F2F",
  },
});

export default DeviceManagementScreen;
