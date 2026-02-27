import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/fonts';
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

import CustomerSupportIcon from '../../../assets/images/customerSupportIcon.svg';
import WebsiteIcon from '../../../assets/images/websiteIcon.svg';
import WhatsAppIcon from '../../../assets/images/whatsappIcon.svg';
import FacebookIcon from '../../../assets/images/facebookIcon.svg';
import TwitterIcon from '../../../assets/images/twitterIcon.svg';
import InstagramIcon from '../../../assets/images/instagramIcon.svg';
import ChevronRightIcon from '../../../assets/images/rightIcon.svg';

const ContactSupportScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook

  // Massivi komponent daxilinə aldıq ki, theme rənglərini ikonlara tətbiq edə bilək
  const supportOptions = [
    {
      id: '1',
      title: 'Customer Support',
      icon: <CustomerSupportIcon width={24} height={24} color={theme.primary} />,
      action: () => Linking.openURL('tel:+994123456789'),
    },
    {
      id: '2',
      title: 'Website',
      icon: <WebsiteIcon width={24} height={24} color={theme.primary} />,
      action: () => Linking.openURL('https://tripsify.app'),
    },
    {
      id: '3',
      title: 'WhatsApp',
      icon: <WhatsAppIcon width={24} height={24} color={theme.primary} />,
      action: () => Linking.openURL('https://wa.me/994123456789'),
    },
    {
      id: '4',
      title: 'Facebook',
      icon: <FacebookIcon width={24} height={24} color={theme.primary} />,
      action: () => Linking.openURL('https://facebook.com/tripsify'),
    },
    {
      id: '5',
      title: 'Twitter',
      icon: <TwitterIcon width={24} height={24} color={theme.primary} />,
      action: () => Linking.openURL('https://twitter.com/tripsify'),
    },
    {
      id: '6',
      title: 'Instagram',
      icon: <InstagramIcon width={24} height={24} color={theme.primary} />,
      action: () => Linking.openURL('https://instagram.com/tripsify'),
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScreenHeader
          title="Contact Support"
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {supportOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
                styles.card, 
                { backgroundColor: theme.cardBg, borderColor: theme.border }
            ]}
            onPress={item.action}
          >
            <View style={styles.cardLeft}>
              {item.icon}
              <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{item.title}</Text>
            </View>
            <ChevronRightIcon 
                width={20} 
                height={20} 
                fill={theme.iconColor} 
                style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.background, // Dinamik
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 16,
  },
  card: {
    display: 'flex',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: '#EEE', // Dinamik
    // backgroundColor: '#FFF', // Dinamik
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
});

export default ContactSupportScreen;
