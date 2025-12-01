import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import CustomScrollIndicator from '../../components/common/CustomScrollIndicator';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamily } from "../../styles/fonts";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader 
        title="Privacy Policy"
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />
      
      <View style={styles.mainContainer}>
        <CustomScrollIndicator contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.updateText}>Last Updated: December 10, 2023</Text>

            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.bodyText}>Tripsify collects the following types of information:</Text>
            <Text style={styles.bulletText}>
              • Personal Information: When you register or use our services, we may collect personal information such as your name, email address, and other details you provide.
            </Text>
            <Text style={styles.bulletText}>
              • Usage Data: We collect data about your interactions with our platform, including your browsing history, search queries, and usage patterns.
            </Text>

            <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
            <Text style={styles.bodyText}>We use your information for the following purposes:</Text>
            <Text style={styles.bulletText}>• To provide and improve our services.</Text>
            <Text style={styles.bulletText}>• To personalize your experience and offer relevant content and recommendations.</Text>
            <Text style={styles.bulletText}>• To send updates, promotions, and important communications.</Text>
            <Text style={styles.bulletText}>• To analyze usage data and improve our platform.</Text>

            <Text style={styles.sectionTitle}>3. Information Sharing</Text>
            <Text style={styles.bodyText}>
              We do not share your personal information with third parties except as required by law or with your explicit consent.
            </Text>

            <Text style={styles.sectionTitle}>4. Data Security</Text>
            <Text style={styles.bodyText}>
              We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.
            </Text>

            <Text style={styles.sectionTitle}>5. Your Rights</Text>
            <Text style={styles.bodyText}>
              You have the right to access, update, or delete your personal information at any time by contacting us.
            </Text>

            <Text style={styles.sectionTitle}>6. Changes to Privacy Policy</Text>
            <Text style={styles.bodyText}>
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the platform.
            </Text>

            <Text style={styles.sectionTitle}>7. Contact Us</Text>
            <Text style={styles.bodyText}>
              If you have any questions about this Privacy Policy, please contact us at privacy@tripsify.com.
            </Text>
          </View>
        </CustomScrollIndicator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: spacing.xlarge,
  },
  content: {
    paddingRight: 12,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
  },

  /** LAST UPDATE TEXT **/
  updateText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,          // unchanged
    color: '#888',
    marginBottom: 24,
  },

  /** SECTION TITLE **/
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,          // unchanged
    color: '#212121',
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 12,
  },

  /** BODY TEXT **/
  bodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 18,          // unchanged
    color: '#424242',
    lineHeight: 28.8,
    letterSpacing: 0.2,
    marginBottom: 12,
  },

  /** BULLET TEXT **/
  bulletText: {
    fontFamily: fontFamily.regular,
    fontSize: 18,          // unchanged
    color: '#424242',
    lineHeight: 28.8,
    letterSpacing: 0.2,
    marginLeft: 8,
    marginBottom: 6,
  },
});


export default PrivacyPolicyScreen;
