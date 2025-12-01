import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import DocumentUpload from '../../components/common/DocumentUpload';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamily, fontSize } from '../../styles/fonts';

const DocumentsScreen = ({ navigation }) => {
  const [driverPassport, setDriverPassport] = useState(null);
  const [driverResidence, setDriverResidence] = useState(null);
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [vehicleCertificate, setVehicleCertificate] = useState(null);

  const documents = [
    {
      title: "Driver Passport",
      required: true,
      description: "Please, upload a clear image of your international passport.",
      notes: [
        "All information must be clearly visible.",
        "The expiration date must not have passed."
      ],
      state: driverPassport,
      setState: setDriverPassport
    },
    {
      title: "Driver Residence Permit",
      required: true,
      description: "Please, upload a clear image of your residence permit.",
      notes: [
        'The residence permit can be a "Resident Card", an "Active Visa" a "Passport stamp indicating residence" issued by Citizenship and Immigration services.',
        "The expiration date must not have passed."
      ],
      state: driverResidence,
      setState: setDriverResidence
    },
    {
      title: "Driver Photo",
      required: true,
      description: "Please, upload a clear profile picture.",
      notes: [
        "The photo needs to be in color and on the background (preferably white) against a flat and solid color) and Shah's license.",
        "Your photo should be visible on the license."
      ],
      state: driverPhoto,
      setState: setDriverPhoto
    },
    {
      title: "Vehicle registration certificate",
      required: true,
      description: "Please, upload a clear image of vehicle's registration card.",
      notes: [
        "All information must be clearly visible.",
        "The expiration date must not have passed."
      ],
      state: vehicleCertificate,
      setState: setVehicleCertificate
    }
  ];

  const handleContinue = () => {
    navigation.navigate('PaymentDetailsScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
          <Text style={styles.title}>Documents</Text>
          <Text style={styles.subtitle}>
            We're legally required to ask you for some documents to sign you up. Rest assured, these documents are carefully stored, and your privacy, photos are encrypted.
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
            />
          ))}
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
    color: colors.text,
    marginBottom: spacing.small,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: spacing.xlarge,
  },
  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  continueButton: {
     height: 60,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
    color: colors.white,
  },
});

export default DocumentsScreen;
