import React from "react";
import { TouchableOpacity, StyleSheet, I18nManager } from "react-native";
import BackIcon from "../../../assets/images/backIcon.svg";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const BackButton = ({ onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {/* İkonun rəngini dinamik edirik */}
      {/* RTL dəstəyi üçün ikonanı çevirmək lazım ola bilər */}
      <BackIcon 
        width={24} 
        height={24} 
        fill={theme.iconColor} // və ya theme.textPrimary
        style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    // alignItems: "center", // Sola yaslanması üçün mərkəzləməni silə və ya saxlayıb padding verə bilərik
    // Amma ScreenHeader-də "space-between" olduğu üçün "center" saxlamaq daha yaxşıdır.
    alignItems: "flex-start", // Adətən BackButton sola sıxılır
  },

});

export default BackButton;
