import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import PhoneIcon from "../../../assets/images/phone.svg";
import ProfileIcon from "../../../assets/images/profile.svg";
import { fontFamily, fontSize } from '../../styles/fonts';

const ExploreScreen = ({ navigation }) => {
 const handleExplore = () => {
  navigation.navigate("MainTabs", {
    screen: "Active Tours",
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={["#6153A2", "#400139"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.circle}
        >
          <View style={styles.iconContainer}>
            <PhoneIcon style={styles.phoneIcon} />
            <View style={styles.profileWrapper}>
              <ProfileIcon style={styles.userIcon} />
            </View>
          </View>
        </LinearGradient>

        {/* Title */}
        <Text style={styles.title}>You're all set!</Text>

        {/* Description */}
        <Text style={styles.description}>
          Congratulations! You're now part of the Tripsify community. We're
          reviewing your application and will notify you within 3 days. For
          real-time updates and next steps, check the app.
        </Text>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.exploreButton} onPress={handleExplore}>
        <Text style={styles.exploreButtonText}>Explore Tripsify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.medium,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xlarge,
    shadowColor: "#181A20",
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  iconContainer: {
    position: "relative",
    width: 60,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 70,
  },
  phoneIcon: {
    width: 60,
  },
  profileWrapper: {
    position: "absolute",
    top: 0,
    backgroundColor: "#6153A2",
    borderRadius: 20,
    padding: 6,
    zIndex: 2,
    elevation: 5,
  },
  userIcon: {
    width: 30,
    height: 30,
  },

  /** 📌 TEXT STYLES WITH FONTS **/
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.title, // 28px
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.medium,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.heading, // 20px
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 0.2,
  },

  /** 📌 BUTTON **/
  exploreButton: {
    height: 60,
    borderRadius: 1000,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.large,
  },
  exploreButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.body,
    color: colors.white,
  },
});


export default ExploreScreen;
