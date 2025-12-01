import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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

const ScheduleDateButton = ({ date, active, onPress }) => (
  <TouchableOpacity
    style={[
      styles.scheduleDateButton,
      active && styles.scheduleDateActiveButton,
    ]}
    onPress={onPress}
  >
    <Text
      style={[styles.scheduleDateText, active && styles.scheduleDateActiveText]}
    >
      {date}
    </Text>
  </TouchableOpacity>
);

const ScheduleAction = ({ icon, label }) => (
  <View style={styles.scheduleAction}>
    {icon}
    <Text style={styles.scheduleActionText}>{label}</Text>
  </View>
);

const ScheduleActions = () => (
  <View style={styles.scheduleActionsWrapper}>
    <ScheduleAction icon={<CarIcon />} label="24min" />
    <ScheduleAction icon={<RouteIcon />} label="7.5km" />
    <ScheduleAction icon={<MapIcon />} label="Google Maps" />
    <ScheduleAction icon={<WeatherIcon />} label="Waze" />
  </View>
);

const ScheduleCard = ({ image, title, arrival, duration, detail }) => (
  <View style={styles.scheduleCard}>
    {image && <Image source={image} style={styles.scheduleImage} />}
    <View style={styles.scheduleCardContent}>
      <Text style={styles.scheduleCardTitle}>{title}</Text>

      {arrival && (
        <View style={styles.scheduleDetailRow}>
          <ClockIcon />
          <Text style={styles.arrivalText}>{arrival}</Text>
        </View>
      )}

      {duration && (
        <View style={styles.scheduleDetailRow}>
          <DurationIcon />
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      )}

      {detail && (
        <View style={styles.scheduleDetailRow}>
          <MoreInfoIcon />
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      )}
    </View>
  </View>
);

const ScheduleItem = ({ icon, children, showActions, isLast }) => (
  <View style={styles.scheduleItem}>
    <View style={styles.leftColumn}>
      {icon}
      <View style={styles.verticalLine} />
    </View>
    <View style={styles.rightColumn}>
      {children}
      {showActions && <ScheduleActions />}
    </View>
  </View>
);

const ScheduleTab = () => {
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
        />
        <ScheduleDateButton
          date="December 23rd"
          active={activeDate === "December 23rd"}
          onPress={() => setActiveDate("December 23rd")}
        />
        <ScheduleDateButton
          date="December 24th"
          active={activeDate === "December 24th"}
          onPress={() => setActiveDate("December 24th")}
        />
      </ScrollView>
      {scheduleData.map((item, index) => (
        <ScheduleItem
          key={item.id}
          icon={item.icon}
          isLast={index === scheduleData.length - 1}
          showActions={item.actions}
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
    backgroundColor: "#E0E0E0",
    marginTop: 16,
  },
  rightColumn: { flex: 1, gap: 16 },
  scheduleDateContainer: { paddingBottom: 24, gap: 8, },
  scheduleDateButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  scheduleDateActiveButton: { backgroundColor: colors.primary },
  scheduleDateText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.text,
  },
  scheduleDateActiveText: { color: "#FFF" },
  scheduleItem: { flexDirection: "row", gap: 16, marginBottom: 20 },
  scheduleCard: {
    alignSelf: "stretch",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    overflow: "hidden",
  },
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
    color: colors.text,
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
    color: colors.primary,
  },
  durationText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.primary,
  },
  detailText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#8D62D7",
  },
  scheduleActionsWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  scheduleAction: { alignItems: "center", gap: 4 },
  scheduleActionText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.primary,
  },
});

export default ScheduleTab;
