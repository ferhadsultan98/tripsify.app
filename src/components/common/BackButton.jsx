import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from "../../styles/colors";
import BackIcon from "../../../assets/images/backIcon.svg";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <BackIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: colors.primary,
  },
});

export default BackButton;
