import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import ChevronRightIcon from "../../../assets/images/rightIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

const HelpSupportScreen = ({ navigation }) => {
  const options = [
    {
      id: 1,
      title: "FAQ",
      onPress: () => navigation.navigate("FAQScreen"),
    },
    {
      id: 2,
      title: "Contact Support",
      onPress: () => navigation.navigate("ContactSupportScreen"),
    },
    {
      id: 3,
      title: "Privacy Policy",
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      id: 4,
      title: "Terms of Service",
      onPress: () => navigation.navigate("TermsOfService"),
    },
    {
      id: 5,
      title: "About us",
      onPress: () => navigation.navigate("AboutUsScreen"),
    },
    {
      id: 6,
      title: "Rate us",
      onPress: () => {
        // Google Play / App Store link
        const url = "https://play.google.com/store/apps/details?id=com.tripsify";
        Linking.openURL(url);
      },
    },
    {
      id: 7,
      title: "Visit Our Website",
      onPress: () => {
        Linking.openURL("https://tripsify.com");
      },
    },
    {
      id: 8,
      title: "Follow us on Social Media",
      onPress: () => navigation.navigate("SocialMediaScreen"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScreenHeader
          title="Help & Support"
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={option.onPress}
            >
              <Text style={styles.optionText}>{option.title}</Text>
              <ChevronRightIcon width={20} height={20} fill="#000" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  optionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,   // unchanged
    fontWeight: "600",
    color: "#000",
  },
});

export default HelpSupportScreen;
