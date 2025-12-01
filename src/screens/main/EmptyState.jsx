import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EmptyIcon from "../../../assets/images/locationIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

const EmptyState = ({ 
  icon: Icon = EmptyIcon, 
  title = "Empty", 
  description = "No information has been published at the moment.\nPlease try again later." 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon width={64} height={64} fill="#9E9E9E" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    alignSelf: "stretch",
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default EmptyState;
