import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import ScreenHeader from '../../components/common/ScreenHeader';
import CustomScrollIndicator from '../../components/common/CustomScrollIndicator';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const TermsOfServiceScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Theme Hook

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScreenHeader 
        title={t('terms_screen.title')}
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />
      
      <View style={styles.mainContainer}>
        <CustomScrollIndicator contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={[styles.updateText, { color: theme.textSecondary }]}>{t('terms_screen.last_updated')}</Text>

            {/* Section 1 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.1.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.1.body')}</Text>

            {/* Section 2 (With Bullets) */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.2.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.2.body')}</Text>
            {(t('terms_screen.sections.2.bullets', { returnObjects: true }) || []).map((bullet, index) => (
                <Text key={index} style={[styles.bulletText, { color: theme.textSecondary }]}>• {bullet}</Text>
            ))}

            {/* Section 3 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.3.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.3.body')}</Text>

            {/* Section 4 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.4.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.4.body')}</Text>

            {/* Section 5 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.5.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.5.body')}</Text>

            {/* Section 6 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.6.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.6.body')}</Text>

            {/* Section 7 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.7.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.7.body')}</Text>

            {/* Section 8 */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{t('terms_screen.sections.8.title')}</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{t('terms_screen.sections.8.body')}</Text>

          </View>
        </CustomScrollIndicator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.white, // Dinamik
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

  /** UPDATE TEXT **/
  updateText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    // color: "#888", // Dinamik
    marginBottom: 24,
    textAlign: 'left', 
  },

  /** SECTION TITLE **/
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    // color: "#212121", // Dinamik
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'left', 
  },

  /** BODY TEXT **/
  bodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    // color: "#424242", // Dinamik
    lineHeight: 28.8,
    letterSpacing: 0.2,
    marginBottom: 12,
    textAlign: 'left', 
  },

  /** BULLETS **/
  bulletText: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    // color: "#424242", // Dinamik
    lineHeight: 28.8,
    letterSpacing: 0.2,
    marginLeft: 8,
    marginBottom: 6,
    textAlign: 'left', 
  },
});

export default TermsOfServiceScreen;
