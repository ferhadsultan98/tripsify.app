import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../../assets/images/searchIcon.svg";
import LogoIcon from "../../../assets/images/tripsifyLogo.svg";
import PlaneIcon from "../../../assets/images/planeIcon.svg";
import CalendarIcon from "../../../assets/images/calendarIcon.svg";
import PeriodIcon from "../../../assets/images/periodIcon.svg";
import PeopleIcon from "../../../assets/images/peopleIcon.svg";
import CarIcon from "../../../assets/images/carIcon.svg";
import CheckIcon from "../../../assets/images/checkIcon.svg";
import SalaryIcon from "../../../assets/images/salaryIcon.svg";
import EmptyState from "./EmptyState";
import { activeTours } from "../../data/toursData";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ActiveToursScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tours, setTours] = useState(activeTours || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchVisible(!searchVisible);
  };
  
  const handleCardPress = (tour) => {
    navigation.navigate("TourDetailScreen", { tour });
  };

  const handleRequestPress = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const confirmRequest = () => {
    const updatedTours = tours.map((t) =>
      t.id === selectedTour.id ? { ...t, requestSent: true } : t
    );
    setTours(updatedTours);
    setModalVisible(false);
  };

  const currentRoute =
    navigation?.getState()?.routes[navigation.getState().index]?.name ||
    "Active Tours";

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <LogoIcon width={32} height={32} />
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>{currentRoute}</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <SearchIcon width={24} height={24} fill={theme.iconColor} />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <View style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}>
          <SearchIcon width={20} height={20} fill={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.textPrimary }]}
            placeholder="Search destinations..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {tours.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tours.map((tour) => (
            <TouchableOpacity key={tour.id} style={styles.tourItem} onPress={() => handleCardPress(tour)}>
              <View style={styles.leftColumn}>
                <PlaneIcon width={24} height={24} />
                <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />
              </View>

              <View style={styles.rightColumn}>
                <View style={[
                    styles.card, 
                    { backgroundColor: theme.cardBg, borderColor: theme.border }
                ]}>
                  <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>{tour.title}</Text>

                  <View style={styles.infoItem}>
                    <PeriodIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={[styles.infoLabel, { color: theme.textPrimary }]}>Period:</Text>
                      <Text style={[styles.infoValue, { color: theme.textSecondary }]}>{tour.period}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <CalendarIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={[styles.infoLabel, { color: theme.textPrimary }]}>Working days:</Text>
                      <Text style={[styles.infoValue, { color: theme.textSecondary }]}>{tour.workingDays}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <PeopleIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={[styles.infoLabel, { color: theme.textPrimary }]}>Pax:</Text>
                      <Text style={[styles.infoValue, { color: theme.textSecondary }]}>{tour.passengers}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <CarIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={[styles.infoLabel, { color: theme.textPrimary }]}>Car type:</Text>
                      <Text style={[styles.infoValue, { color: theme.textSecondary }]}>{tour.car}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <CheckIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={[styles.infoLabel, { color: theme.textPrimary }]}>Included:</Text>
                      <Text style={[styles.infoValue, { color: theme.textSecondary }]}>
                        {tour.included.join("\n")}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.salaryContainer}>
                    <SalaryIcon width={20} height={20} color={theme.primary} />
                    <Text style={[styles.salaryLabel, { color: theme.primary }]}>Salary:</Text>
                    <Text style={[styles.salaryValue, { color: theme.primary }]}>{tour.salary}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.requestButton,
                    { backgroundColor: theme.primary },
                    tour.requestSent && { backgroundColor: theme.inputBg }, // Disabled
                  ]}
                  disabled={tour.requestSent}
                  onPress={() => !tour.requestSent && handleRequestPress(tour)}
                >
                  <Text
                    style={[
                      styles.requestButtonText,
                      { color: '#FFFFFF' },
                      tour.requestSent && { color: theme.textSecondary },
                    ]}
                  >
                    {tour.requestSent
                      ? "You Already Sent Request For This Job"
                      : "Send Request For This Job"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Are you sure?</Text>
            <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              Do you want to send a request for this job?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo, { backgroundColor: theme.inputBg }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonTextNo, { color: theme.textPrimary }]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes, { backgroundColor: theme.primary }]}
                onPress={confirmRequest}
              >
                <Text style={[styles.modalButtonTextYes, { color: '#FFFFFF' }]}>Yes, Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white, // Dinamik
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    // color: "#000", // Dinamik
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 48,
    // backgroundColor: "#F5F5F5", // Dinamik
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: "#000", // Dinamik
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 8,
    paddingHorizontal: 24,
    gap: 24,
  },
  tourItem: {
    flexDirection: "row",
    gap: 16,
  },
  leftColumn: {
    alignItems: "center",
    paddingTop: 4,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    // backgroundColor: "#E0E0E0", // Dinamik
    marginTop: 8,
  },
  rightColumn: {
    flex: 1,
    gap: 16,
  },
  card: {
    padding: 16,
    gap: 16,
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: "#EEE", // Dinamik
    // backgroundColor: "#FFF", // Dinamik
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: "#000", // Dinamik
  },
  infoItem: {
    flexDirection: "row",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    // color: "#000", // Dinamik
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    // color: "#757575", // Dinamik
    lineHeight: 20,
  },
  salaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  salaryLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    // color: "#8D62D7", // Dinamik
  },
  salaryValue: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    // color: "#8D62D7", // Dinamik
  },
  requestButton: {
    height: 55,
    borderRadius: 12,
    // backgroundColor: colors.primary, // Dinamik
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonDisabled: {
    // backgroundColor: "#F5F5F5", // Dinamik
  },
  requestButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: "#FFF", // Dinamik
  },
  requestButtonTextDisabled: {
    // color: "#757575", // Dinamik
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    // backgroundColor: "white", // Dinamik
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 16,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    textAlign: "center",
    // color: "#000", // Dinamik
  },
  modalSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: "center",
    // color: "#757575", // Dinamik
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonNo: {
    // backgroundColor: "#F5F5F5", // Dinamik
  },
  modalButtonYes: {
    // backgroundColor: colors.primary, // Dinamik
  },
  modalButtonTextNo: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: "#000", // Dinamik
  },
  modalButtonTextYes: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: "#FFF", // Dinamik
  },
});

export default ActiveToursScreen;
