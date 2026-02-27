import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  // Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import { spacing } from "../../styles/spacing";
import { fontFamily, fontSize } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook
import DocumentPicker from "react-native-document-picker";
const MAX_FILE_SIZE_MB = 10;

const DocumentUpload = ({
  title,
  required,
  description,
  notes = [],
  onUpload,
  file,
  showBorder = true,
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const formatSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  // const handlePickImage = () => {
  //   Alert.alert("Upload Document", "Choose an option", [
  //     { text: "Camera", onPress: () => launchPicker("camera") },
  //     { text: "Gallery", onPress: () => launchPicker("gallery") },
  //     { text: "Cancel", style: "cancel" },
  //   ]);
  // };

  // const launchPicker = (type) => {
  //   setLoading(true);
  //   const options = {
  //     mediaType: "photo",
  //     quality: 0.8,
  //     includeBase64: false,
  //   };

  //   const picker =
  //     type === "camera"
  //       ? ImagePicker.launchCamera
  //       : ImagePicker.launchImageLibrary;

  //   picker(options, (response) => {
  //     setLoading(false);
  //     if (response.didCancel || response.errorCode) return;

  //     const asset = response.assets?.[0];
  //     if (!asset) return;

  //     const sizeMB = asset.fileSize / (1024 * 1024);
  //     if (sizeMB > MAX_FILE_SIZE_MB) {
  //       Alert.alert(
  //         "File too large",
  //         `Max allowed size is ${MAX_FILE_SIZE_MB} MB.`,
  //       );
  //       return;
  //     }

  //     onUpload({
  //       uri: asset.uri,
  //       name: asset.fileName || "document.pdf",
  //       type: "application/pdf",
  //       size: asset.fileSize,
  //     });
  //   });
  // };
const handlePickPDF = async () => {
  try {
    setLoading(true);
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
    });

    const sizeMB = result.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      Alert.alert("File too large", `Max allowed size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    onUpload({
      uri: result.uri,
      name: result.name || "document.pdf",
      type: result.type || "application/pdf",
      size: result.size,
    });
  } catch (err) {
    if (!DocumentPicker.isCancel(err)) {
      Alert.alert("Error", "Failed to pick document.");
    }
  } finally {
    setLoading(false);
  }
};
  const handleRemove = () => {
    Alert.alert("Remove", "Are you sure you want to remove this file?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => onUpload(null) },
    ]);
  };

  return (
    <View
      style={[
        uploadStyles.wrapper,
        showBorder && {
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
      ]}
    >
      {/* Title */}
      <View style={uploadStyles.titleRow}>
        <Text style={[uploadStyles.title, { color: theme.textPrimary }]}>
          {title}
        </Text>
        {required && (
          <View
            style={[
              uploadStyles.requiredBadge,
              { backgroundColor: theme.primary + "20" },
            ]}
          >
            <Text style={[uploadStyles.requiredText, { color: theme.primary }]}>
              Required
            </Text>
          </View>
        )}
      </View>

      {/* Description */}
      <Text style={[uploadStyles.description, { color: theme.textSecondary }]}>
        {description}
      </Text>

      {/* Notes */}
      {notes.map((note, i) => (
        <View key={i} style={uploadStyles.noteRow}>
          <Text style={[uploadStyles.noteDot, { color: theme.textSecondary }]}>
            •
          </Text>
          <Text style={[uploadStyles.noteText, { color: theme.textSecondary }]}>
            {note}
          </Text>
        </View>
      ))}

      {/* Upload Area */}
      {file ? (
        <View
          style={[
            uploadStyles.filePreview,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          {/* <Image
            source={{ uri: file.uri }}
            style={uploadStyles.previewImage}
            resizeMode="cover"
          /> */}
          <View style={[uploadStyles.pdfIcon, { backgroundColor: theme.primary + "15" }]}>
  <Text style={{ color: theme.primary, fontWeight: "bold", fontSize: 12 }}>PDF</Text>
</View>
          <View style={uploadStyles.fileInfo}>
            <Text
              style={[uploadStyles.fileName, { color: theme.textPrimary }]}
              numberOfLines={1}
            >
              {file.name}
            </Text>
            <Text
              style={[uploadStyles.fileSize, { color: theme.textSecondary }]}
            >
              {formatSize(file.size)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleRemove}
            style={uploadStyles.removeBtn}
          >
            <Text style={uploadStyles.removeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            uploadStyles.uploadBox,
            {
              borderColor: theme.primary,
              backgroundColor: theme.primary + "08",
            },
          ]}
onPress={handlePickPDF}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color={theme.primary} />
          ) : (
            <>
              <Text style={uploadStyles.uploadIcon}>📎</Text>
              <Text style={[uploadStyles.uploadText, { color: theme.primary }]}>
                Tap to upload
              </Text>
              <Text
                style={[uploadStyles.uploadSub, { color: theme.textSecondary }]}
              >
                Only PDF • Max {MAX_FILE_SIZE_MB} MB
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const uploadStyles = StyleSheet.create({
  pdfIcon: {
  width: 52,
  height: 52,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
},
  wrapper: {
    paddingVertical: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
  },
  requiredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  requiredText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    lineHeight: 20,
    marginBottom: 8,
  },
  noteRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
  },
  noteDot: {
    fontSize: 12,
    marginTop: 2,
  },
  noteText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  uploadBox: {
    marginTop: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  uploadIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  uploadText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.small,
  },
  uploadSub: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginTop: 2,
  },
  filePreview: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  previewImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.small,
  },
  fileSize: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginTop: 2,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF444420",
    alignItems: "center",
    justifyContent: "center",
  },
  removeIcon: {
    color: "#FF4444",
    fontSize: 12,
    fontWeight: "bold",
  },
});

// ─────────────────────────────────────────────
// DocumentsScreen (heç nə silinmədi, yalnız əlavə edildi)
// ─────────────────────────────────────────────

const DocumentsScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook
  const [driverPassport, setDriverPassport] = useState(null);
  const [driverResidence, setDriverResidence] = useState(null);
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [vehicleCertificate, setVehicleCertificate] = useState(null);

  const documents = [
    {
      title: "Driver Passport",
      required: true,
      description:
        "Please, upload a clear image of your international passport.",
      notes: [
        "All information must be clearly visible.",
        "The expiration date must not have passed.",
      ],
      state: driverPassport,
      setState: setDriverPassport,
    },
    {
      title: "Driver Residence Permit",
      required: true,
      description: "Please, upload a clear image of your residence permit.",
      notes: [
        'The residence permit can be a "Resident Card", an "Active Visa" a "Passport stamp indicating residence" issued by Citizenship and Immigration services.',
        "The expiration date must not have passed.",
      ],
      state: driverResidence,
      setState: setDriverResidence,
    },
    {
      title: "Driver Photo",
      required: true,
      description: "Please, upload a clear profile picture.",
      notes: [
        "The photo needs to be in color and on the background (preferably white) against a flat and solid color) and Shah's license.",
        "Your photo should be visible on the license.",
      ],
      state: driverPhoto,
      setState: setDriverPhoto,
    },
    {
      title: "Vehicle registration certificate",
      required: true,
      description:
        "Please, upload a clear image of vehicle's registration card.",
      notes: [
        "All information must be clearly visible.",
        "The expiration date must not have passed.",
      ],
      state: vehicleCertificate,
      setState: setVehicleCertificate,
    },
  ];

  const handleContinue = () => {
    navigation.navigate("PaymentDetailsScreen");
  };

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <ScreenHeader
          onBackPress={() => navigation.goBack()}
          currentStep={5}
          totalSteps={6}
          showProgress={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Documents
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            We're legally required to ask you for some documents to sign you up.
            Rest assured, these documents are carefully stored, and your
            privacy, photos are encrypted.
          </Text>

          {documents.map((doc, index) => (
            <DocumentUpload
              key={index}
              title={doc.title}
              required={doc.required}
              description={doc.description}
              notes={doc.notes}
              onUpload={doc.setState}
              file={doc.state}
              showBorder={index < documents.length - 1}
              // Əlavə olaraq, əgər DocumentUpload komponenti props qəbul edirsə, theme ötürülə bilər.
              // Amma ideal variant DocumentUpload-un içində useTheme istifadə edilməsidir.
            />
          ))}
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomSection, { borderTopColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: theme.primary }]}
            onPress={handleContinue}
          >
            <Text style={[styles.continueButtonText, { color: "#FFFFFF" }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: spacing.large,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.title,
    // color: colors.text, // Dinamik
    marginBottom: spacing.small,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    // color: colors.textLight, // Dinamik
    lineHeight: 22,
    marginBottom: spacing.xlarge,
  },
  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
    // borderTopColor: '#F0F0F0', // Dinamik
  },
  continueButton: {
    height: 60,
    borderRadius: 32,
    // backgroundColor: colors.primary, // Dinamik
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
    // color: colors.white, // Dinamik
  },
});

export default DocumentsScreen;
