import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/fonts';

import CustomerSupportIcon from '../../../assets/images/customerSupportIcon.svg';
import WebsiteIcon from '../../../assets/images/websiteIcon.svg';
import WhatsAppIcon from '../../../assets/images/whatsappIcon.svg';
import FacebookIcon from '../../../assets/images/facebookIcon.svg';
import TwitterIcon from '../../../assets/images/twitterIcon.svg';
import InstagramIcon from '../../../assets/images/instagramIcon.svg';
import ChevronRightIcon from '../../../assets/images/rightIcon.svg';

const supportOptions = [
  {
    id: '1',
    title: 'Customer Support',
    icon: <CustomerSupportIcon width={24} height={24} color={colors.primary} />,
    action: () => Linking.openURL('tel:+994123456789'),
  },
  {
    id: '2',
    title: 'Website',
    icon: <WebsiteIcon width={24} height={24} color={colors.primary} />,
    action: () => Linking.openURL('https://tripsify.app'),
  },
  {
    id: '3',
    title: 'WhatsApp',
    icon: <WhatsAppIcon width={24} height={24} color={colors.primary} />,
    action: () => Linking.openURL('https://wa.me/994123456789'),
  },
  {
    id: '4',
    title: 'Facebook',
    icon: <FacebookIcon width={24} height={24} color={colors.primary} />,
    action: () => Linking.openURL('https://facebook.com/tripsify'),
  },
  {
    id: '5',
    title: 'Twitter',
    icon: <TwitterIcon width={24} height={24} color={colors.primary} />,
    action: () => Linking.openURL('https://twitter.com/tripsify'),
  },
  {
    id: '6',
    title: 'Instagram',
    icon: <InstagramIcon width={24} height={24} color={colors.primary} />,
    action: () => Linking.openURL('https://instagram.com/tripsify'),
  },
];

const ContactSupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
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
            style={styles.card}
            onPress={item.action}
          >
            <View style={styles.cardLeft}>
              {item.icon}
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <ChevronRightIcon width={20} height={20} fill="#000" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: '#EEE',
    backgroundColor: '#FFF',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text,
  },
});

export default ContactSupportScreen;
