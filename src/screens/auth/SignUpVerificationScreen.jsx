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
import { colors } from "../../styles/colors";
import MessageIcon from "../../../assets/images/message.svg";
import WhatsappIcon from "../../../assets/images/whatsapp.svg";
import CallIcon from "../../../assets/images/callIcon.svg";
import { fontFamily } from '../../styles/fonts';

const SignUpVerificationScreen = ({ navigation, route }) => {
  const { phoneNumber, email, currentStep, totalSteps } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = (selectedOption) => {
    setSelectedMethod(selectedOption);
    
    navigation.navigate('VerificationCodeScreen', { 
      phoneNumber,
      email,
      method: 'phone', // Həmişə 'phone' olacaq
      verificationMethod: selectedOption,
      currentStep: (currentStep || 2) + 1,
      totalSteps: totalSteps || 6,
      flow: 'register',
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
              <Text style={styles.title}>Choose a verification method</Text>

              <Text style={styles.subtitle}>
                The verification code will be sent to this number:
              </Text>
              <Text style={styles.contactInfo}>
                {phoneNumber || '+994502122237'}
              </Text>
            </View>

            {/* Options Section */}
            <View style={styles.optionsSection}>
              {/* SMS Option */}
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedMethod === "sms" && styles.optionCardSelected,
                ]}
                onPress={() => handleMethodSelect("sms")}
              >
                <View style={styles.iconContainer}>
                  <MessageIcon width={24} height={24} />
                </View>
                <Text style={styles.optionText}>Get code with SMS</Text>
              </TouchableOpacity>

              {/* WhatsApp Option */}
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedMethod === "whatsapp" && styles.optionCardSelected,
                ]}
                onPress={() => handleMethodSelect("whatsapp")}
              >
                <View style={styles.iconContainer}>
                  <WhatsappIcon width={24} height={24} />
                </View>
                <Text style={styles.optionText}>Get code with WhatsApp</Text>
              </TouchableOpacity>

              {/* Call Option */}
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedMethod === "call" && styles.optionCardSelected,
                ]}
                onPress={() => handleMethodSelect("call")}
              >
                <View style={styles.iconContainer}>
                  <CallIcon width={24} height={24} />
                </View>
                <Text style={styles.optionText}>Get code with Call</Text>
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
    color: colors.text,
    alignSelf: "center",
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#616161",
    alignSelf: "center",
    textAlign: "center",
  },
  contactInfo: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#8D62D7",
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
    borderRadius: 1000,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEE",
    width: "100%",
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: "#F5F0FF",
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
    textAlign:'center',
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text,
  },
});

export default SignUpVerificationScreen;
