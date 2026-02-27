import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import LicenseIcon from "../../../assets/images/licenseIcon.svg";
import AgeIcon from "../../../assets/images/ageIcon.svg";
import ResidentIcon from "../../../assets/images/residentIcon.svg";
import DrivingSkillsIcon from "../../../assets/images/carIcons.svg";
import LanguageIcon from "../../../assets/images/languageIcon.svg";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const RequirementItem = ({ icon, children, isLast, theme }) => (
  <View style={styles.reqItem}>
    <View style={styles.leftColumn}>
      {icon}
      <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />
    </View>
    <View style={styles.rightColumn}>{children}</View>
  </View>
);

const RequirementCard = ({ title, description, theme }) => (
  <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
    <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{title}</Text>
    <View style={[styles.divider, { backgroundColor: theme.border }]} />
    <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>{description}</Text>
  </View>
);

const RequirementsTab = () => {
  const { theme } = useTheme(); // Theme Hook

  const requirementsData = [
    {
      id: "license",
      icon: <LicenseIcon width={24} height={24} />,
      title: "Driving License",
      description:
        "Driver's license obtained from European countries or additionally, an international driving permit must be present.",
    },
    {
      id: "age",
      icon: <AgeIcon width={24} height={24} />,
      title: "Age Restriction",
      description: "Driver must be at least 19 years old.",
    },
    {
      id: "permit",
      icon: <ResidentIcon width={24} height={24} />,
      title: "Resident Permit",
      description:
        "The driver must have an active visa or residence card valid for the duration of the tour.",
    },
    {
      id: "skills",
      icon: <DrivingSkillsIcon width={24} height={24} />,
      title: "Driving Skills",
      description:
        "The driver must be able to drive a manual transmission car.",
    },
    {
      id: "language",
      icon: <LanguageIcon width={24} height={24} />,
      title: "Language Skills",
      description: "The driver must be able to speak Arabic or English.",
    },
  ];

  return (
    <>
      {requirementsData.map((item, index) => (
        <RequirementItem
          key={item.id}
          icon={item.icon}
          isLast={index === requirementsData.length - 1}
          theme={theme}
        >
          <RequirementCard
            title={item.title}
            description={item.description}
            theme={theme}
          />
        </RequirementItem>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  reqItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  leftColumn: {
    width: 24,
    marginRight: 16,
    alignItems: "center",
  },
  verticalLine: {
    flex: 1,
    width: 1.5,
    // backgroundColor: "#E0E0E0", // Dinamik
    marginTop: 16,
  },
  rightColumn: {
    flex: 1,
  },
  card: {
    padding: 16,
    gap: 12,
    alignSelf: "stretch",
    // backgroundColor: "white", // Dinamik
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: "#EEE", // Dinamik
  },
  cardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    // color: colors.text, // Dinamik
  },
  divider: {
    height: 1,
    // backgroundColor: "#F0F0F0", // Dinamik
    alignSelf: "stretch",
  },
  cardDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: "#616161", // Dinamik
    lineHeight: 20,
  },
});

export default RequirementsTab;
