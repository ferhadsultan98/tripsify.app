// src/screens/tours/details/DetailsTab.jsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import LeadGuestIcon from "../../../assets/images/profileIcon.svg";
import NoteIcon from "../../../assets/images/noteIcon.svg";
import PeriodIcon from "../../../assets/images/periodIcon.svg";
import CalendarIcon from "../../../assets/images/calendarIcon.svg";
import PeopleIcon from "../../../assets/images/peopleIcon.svg";
import CountryIcon from "../../../assets/images/countryIcon.svg";
import IncludedIcon from "../../../assets/images/checkIcon.svg";
import NotIncludedIcon from "../../../assets/images/notIncludedIcon.svg";
import SalaryIcon from "../../../assets/images/salaryIconDark.svg";
import DriverIcon from "../../../assets/images/driverIcon.svg";
import InfoIcon from "../../../assets/images/infoIcon.svg";
import PassportIcon from "../../../assets/images/passportIcon.svg";
import CallIcon from "../../../assets/images/callIcon-purple.svg";
import WhatsAppIcon from "../../../assets/images/Whatsapp-purple2.svg";

const DetailItem = ({ icon, children, isLast }) => (
  <View style={styles.detailItem}>
    <View style={styles.leftColumn}>
      {icon}
      <View style={styles.verticalLine} />
    </View>
    <View style={styles.rightColumn}>{children}</View>
  </View>
);

const DetailCard = ({ label, value, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardLabel}>{label}</Text>
    {value && <Text style={styles.cardValue}>{value}</Text>}
    {children}
  </View>
);

const ActionButtons = () => (
  <View style={styles.actionsContainer}>
    <TouchableOpacity style={styles.actionBtn}>
      <InfoIcon />
      <Text style={styles.actionText}>Info</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionBtn}>
      <PassportIcon />
      <Text style={styles.actionText}>Passport</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionBtn}>
      <CallIcon />
      <Text style={{ color: colors.primary }}>Call</Text>
    </TouchableOpacity> 
    <TouchableOpacity style={styles.actionBtn}>
      <WhatsAppIcon />
      <Text style={{ color: colors.primary }}>WhatsApp</Text>
    </TouchableOpacity>
  </View>
);

const DetailsTab = ({ tour }) => {
  const tourDetails = [
    {
      id: "guest",
      icon: <LeadGuestIcon width={24} height={24} />,
      Card: () => (
        <DetailCard
          label="Lead Guest Informations"
          value={tour.guestName || "Rashed Mohamed Almarzooqi"}
        >
          <ActionButtons />
        </DetailCard>
      ),
    },
    {
      id: "note",
      icon: <NoteIcon width={24} height={24} />,
      Card: () => (
        <DetailCard
          label="Important Note"
          value={
            tour.note ||
            "Guests are coming to honeymoon and you need to welcome them with a bouquet of flowers."
          }
        />
      ),
    },
    {
      id: "period",
      icon: <PeriodIcon width={24} height={24} />,
      Card: () => <DetailCard label="Period" value={tour.period} />,
    },
    {
      id: "days",
      icon: <CalendarIcon width={24} height={24} />,
      Card: () => (
        <DetailCard label="Total Working Days" value={tour.workingDays} />
      ),
    },
    {
      id: "pax",
      icon: <PeopleIcon width={24} height={24} />,
      Card: () => <DetailCard label="Passengers" value={tour.passengers} />,
    },
    {
      id: "countries",
      icon: <CountryIcon width={24} height={24} />,
      Card: () => (
        <DetailCard
          label="Countries"
          value={
            Array.isArray(tour.countries)
              ? tour.countries.join(", ")
              : "Austria 🇦🇹, France 🇫🇷, Switzerland 🇨🇭"
          }
        />
      ),
    },
    {
      id: "included",
      icon: <IncludedIcon width={24} height={24} />,
      Card: () => (
        <DetailCard
          label="Included"
          value={
            Array.isArray(tour.included) ? tour.included.join("\n") : "N/A"
          }
        />
      ),
    },
    {
      id: "notIncluded",
      icon: <NotIncludedIcon width={24} height={24} />,
      Card: () => (
        <DetailCard
          label="Not Included"
          value={
            Array.isArray(tour.not_included)
              ? tour.not_included.join("\n")
              : "N/A"
          }
        />
      ),
    },
    {
      id: "salary",
      icon: <SalaryIcon width={24} height={24} />,
      Card: () => <DetailCard label="Salary" value={tour.salary} />,
    },
    {
      id: "driver",
      icon: <DriverIcon width={24} height={24} />,
      Card: () => (
        <DetailCard
          label="Driver Information"
          value={tour.driverName || "Vugar Alishov"}
        >
          <ActionButtons />
        </DetailCard>
      ),
    },
  ];

  return (
    <>
      {tourDetails.map((item, index) => (
        <DetailItem
          key={item.id}
          icon={item.icon}
          isLast={index === tourDetails.length - 1}
        >
          <item.Card />
        </DetailItem>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  detailItem: { flexDirection: "row", marginBottom: 20 },
  leftColumn: { width: 24, marginRight: 16, alignItems: "center" },
  verticalLine: {
    flex: 1,
    width: 1.5,
    backgroundColor: "#E0E0E0",
    marginTop: 16,
  },
  rightColumn: { flex: 1 },
  card: {
    padding: 16,
    gap: 8,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  cardLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#757575",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    paddingBottom: 15,
  },
  cardValue: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    marginTop: 8,
    alignSelf: "stretch",
  },
  actionBtn: { alignItems: "center", gap: 6 },
  actionText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
});

export default DetailsTab;
