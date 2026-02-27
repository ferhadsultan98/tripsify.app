import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import LocationIcon from "../../../assets/images/locationIcon.svg";
import ClockIcon from "../../../assets/images/periodIcon.svg";
import DurationIcon from "../../../assets/images/durationIcon.svg";
import MoreInfoIcon from "../../../assets/images/moreInfoIcon.svg";
import CarIcon from "../../../assets/images/carIcon.svg";
import RouteIcon from "../../../assets/images/routeIcon.svg";
import MapIcon from "../../../assets/images/mapIcon.svg";
import WeatherIcon from "../../../assets/images/weatherIcon.svg";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

// --- Tarix Düyməsi ---
const ScheduleDateButton = ({ date, active, onPress, theme }) => (
  <TouchableOpacity
    style={[
      styles.scheduleDateButton,
      { backgroundColor: theme.inputBg },
      active && { backgroundColor: theme.primary },
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.scheduleDateText,
        { color: theme.textPrimary },
        active && { color: "#FFFFFF" },
      ]}
    >
      {date}
    </Text>
  </TouchableOpacity>
);

// --- Tək İkon (Alt hissə üçün) ---
const ScheduleAction = ({ icon, label, theme }) => (
  <View style={styles.scheduleAction}>
    {icon}
    <Text style={[styles.scheduleActionText, { color: theme.primary }]}>{label}</Text>
  </View>
);

// --- İkonlar Qrupu (Sabit qalan hissə) ---
const ScheduleActions = ({ theme }) => (
  <View style={[styles.scheduleActionsWrapper, { borderColor: theme.border }]}>
    <ScheduleAction icon={<CarIcon />} label="24min" theme={theme} />
    <ScheduleAction icon={<RouteIcon />} label="7.5km" theme={theme} />
    <ScheduleAction icon={<MapIcon />} label="Google Maps" theme={theme} />
    <ScheduleAction icon={<WeatherIcon />} label="Waze" theme={theme} />
  </View>
);

// --- YENİLƏNMİŞ: ScheduleCard (Flip Animasiyası və Dizayn) ---
const ScheduleCard = ({ image, title, arrival, duration, detail, theme }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Kartı çevirən funksiya
  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <Pressable onPress={flipCard} style={styles.cardContainer}>
      <View>
        {/* --- ÖN TƏRƏF (Original Data) --- */}
        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardFront,
            { backgroundColor: theme.cardBg, borderColor: theme.border },
            frontAnimatedStyle,
          ]}
        >
          {image && <Image source={image} style={styles.scheduleImage} />}
          <View style={styles.scheduleCardContent}>
            <Text style={[styles.scheduleCardTitle, { color: theme.textPrimary }]}>{title}</Text>
            {arrival && (
              <View style={styles.scheduleDetailRow}>
                <ClockIcon />
                <Text style={[styles.arrivalText, { color: theme.primary }]}>{arrival}</Text>
              </View>
            )}
            {duration && (
              <View style={styles.scheduleDetailRow}>
                <DurationIcon />
                <Text style={[styles.durationText, { color: theme.primary }]}>{duration}</Text>
              </View>
            )}
            {detail && (
              <View style={styles.scheduleDetailRow}>
                <MoreInfoIcon />
                <Text style={[styles.detailText, { color: theme.primary }]}>{detail}</Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* --- ARXA TƏRƏF (Şəkildəki Dizayn) --- */}
        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardBack,
            { backgroundColor: theme.cardBg, borderColor: theme.border },
            backAnimatedStyle,
          ]}
        >
          <View style={styles.backContentContainer}>
            {/* Başlıq Hissəsi */}
            <View style={styles.backHeader}>
              <Text style={[styles.backTitleMain, { color: theme.textPrimary }]}>
                Costa Coffe Landstraßer
              </Text>
              <Text style={[styles.backTitleSub, { color: theme.textPrimary }]}>
                Hauptstraße
              </Text>
            </View>

            {/* Ayırıcı Xətt */}
            <View style={[styles.backDivider, { backgroundColor: theme.border }]} />

            {/* Mətn Hissəsi */}
            <Text style={[styles.backBodyText, { color: theme.textSecondary || "#666" }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Text>
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

// --- ScheduleItem (Struktur) ---
const ScheduleItem = ({ icon, children, showActions, isLast, theme }) => (
  <View style={styles.scheduleItem}>
    <View style={styles.leftColumn}>
      {icon}
      <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />
    </View>
    <View style={styles.rightColumn}>
      {children} 
      {/* İkonlar burada render olur, karta daxil deyil, ona görə dönmür */}
      {showActions && <ScheduleActions theme={theme} />}
    </View>
  </View>
);

const ScheduleTab = () => {
  const { theme } = useTheme();
  const [activeDate, setActiveDate] = useState("December 22nd");

  const scheduleData = [
    {
      id: 1,
      icon: <LocationIcon width="24" height="24" />,
      actions: true,
      Card: () => (
        <ScheduleCard
          image={require("../../../assets/images/hotel.png")}
          title="Transfer from Vienna Airport to Arthotel Schwan"
          arrival="Arrival Time: 15:00"
          duration="Duration: 1hr 20 min"
          detail="More Details about Flight"
          theme={theme}
        />
      ),
    },
    {
      id: 2,
      icon: <LocationIcon width="24" height="24" />,
      actions: true,
      Card: () => (
        <ScheduleCard
          image={require("../../../assets/images/prater.png")}
          title="Prater Park"
          arrival="Start Time: 14:00"
          duration="Duration: 2hr 30 min"
          detail="More Details about Prater Park"
          theme={theme}
        />
      ),
    },
  ];

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scheduleDateContainer}
      >
        <ScheduleDateButton
          date="December 22nd"
          active={activeDate === "December 22nd"}
          onPress={() => setActiveDate("December 22nd")}
          theme={theme}
        />
        <ScheduleDateButton
          date="December 23rd"
          active={activeDate === "December 23rd"}
          onPress={() => setActiveDate("December 23rd")}
          theme={theme}
        />
        <ScheduleDateButton
          date="December 24th"
          active={activeDate === "December 24th"}
          onPress={() => setActiveDate("December 24th")}
          theme={theme}
        />
      </ScrollView>
      {scheduleData.map((item, index) => (
        <ScheduleItem
          key={item.id}
          icon={item.icon}
          isLast={index === scheduleData.length - 1}
          showActions={item.actions}
          theme={theme}
        >
          <item.Card />
        </ScheduleItem>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  leftColumn: { alignItems: "center" },
  verticalLine: {
    flex: 1,
    width: 1.5,
    marginTop: 16,
  },
  rightColumn: { flex: 1, gap: 16 },
  scheduleDateContainer: { paddingBottom: 24, gap: 8 },
  scheduleDateButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scheduleDateText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  scheduleItem: { flexDirection: "row", gap: 16, marginBottom: 20 },

  // --- Flip Card Styles ---
  cardContainer: {
    alignSelf: "stretch",
  },
  flipCard: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    backfaceVisibility: "hidden", // Arxa tərəfi gizlətmək üçün
    minHeight: 280, // Hündürlüyü sabitləmək yaxşı olar ki, dönəndə ölçü dəyişməsin
  },
  flipCardFront: {
    // Ön tərəf üçün xüsusi stil lazım deyil
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  // ------------------------

  // --- Original Card Content Styles ---
  scheduleImage: {
    width: "100%",
    height: 150,
  },
  scheduleCardContent: {
    padding: 16,
    gap: 12,
  },
  scheduleCardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
  scheduleDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  arrivalText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  durationText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  detailText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },

  // --- New Back Card Design Styles ---
  backContentContainer: {
    padding: 20,
    flex: 1,
  },
  backHeader: {
    marginBottom: 12,
  },
  backTitleMain: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    marginBottom: 2,
  },
  backTitleSub: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  backDivider: {
    height: 1,
    width: "100%",
    marginBottom: 16,
    opacity: 0.2, // Zəif xətt
  },
  backBodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20, // Oxunaqlıq üçün
    textAlign: "left",
  },
  // ----------------------------------

  scheduleActionsWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 12,
    borderWidth: 1,
  },
  scheduleAction: { alignItems: "center", gap: 4 },
  scheduleActionText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
});

export default ScheduleTab;
