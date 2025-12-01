import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Linking,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { colors } from "../styles/colors";
import { fontFamily } from "../styles/fonts";

const VERSION_URL = "https://api.tripsify.app/update/version";

const ModernUpdateModal = ({ visible, latest, changelog, apkUrl, onClose }) => (
  <Modal visible={visible} animationType="fade" transparent>
    <View style={styles.modalBackdrop}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Update Available</Text>
        <Text style={styles.versionText}>New version {latest} is available!</Text>
        {changelog ? (
          <View style={styles.changelogBox}>
            <Text style={styles.changelogTitle}>What's new:</Text>
            <Text style={styles.changelogText}>{changelog}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            Linking.openURL(apkUrl);
            onClose();
          }}
        >
          <Text style={styles.buttonText}>Download & Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissBtn} onPress={onClose}>
          <Text style={styles.dismissText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export function useModernAppUpdate() {
  const [modalVisible, setModalVisible] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");
  const [changelog, setChangelog] = useState("");
  const [apkUrl, setApkUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(VERSION_URL);
        const data = await res.json();

        const latest = data.latest_version;
        const apk = data.apk_url;
        const log = data.changelog;

        const current = DeviceInfo.getVersion();

        if (latest && latest !== current) {
          setLatestVersion(latest);
          setApkUrl(apk);
          setChangelog(log || "");
          setModalVisible(true);
        }
      } catch (err) {
        console.log("Update error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const modal = (
    <ModernUpdateModal
      visible={modalVisible}
      latest={latestVersion}
      changelog={changelog}
      apkUrl={apkUrl}
      onClose={() => setModalVisible(false)}
    />
  );

  return [modal, loading];
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(36,41,51,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 4,
  },
  versionText: {
    fontFamily: fontFamily.semiBold,
    color: colors.text,
    fontSize: 15,
    marginBottom: 12,
  },
  changelogBox: {
    backgroundColor: "#F5F7FE",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    marginBottom: 8,
  },
  changelogTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primary,
    marginBottom: 3,
  },
  changelogText: {
    fontFamily: fontFamily.regular,
    color: "#444",
    fontSize: 13,
  },
  updateButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  dismissBtn: {
    marginTop: 12,
    alignItems: "center",
  },
  dismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: "#9499A1",
  },
});

