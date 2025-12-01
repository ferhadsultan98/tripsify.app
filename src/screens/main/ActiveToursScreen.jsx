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

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ActiveToursScreen = ({ navigation }) => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LogoIcon width={32} height={32} />
        <Text style={styles.headerTitle}>{currentRoute}</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <SearchIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} fill="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor="#9E9E9E"
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
                <View style={styles.verticalLine} />
              </View>

              <View style={styles.rightColumn}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{tour.title}</Text>

                  <View style={styles.infoItem}>
                   
                    <PeriodIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Period:</Text>
                      <Text style={styles.infoValue}>{tour.period}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <CalendarIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Working days:</Text>
                      <Text style={styles.infoValue}>{tour.workingDays}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <PeopleIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Pax:</Text>
                      <Text style={styles.infoValue}>{tour.passengers}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <CarIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Car type:</Text>
                      <Text style={styles.infoValue}>{tour.car}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <CheckIcon width={20} height={20} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Included:</Text>
                      <Text style={styles.infoValue}>
                        {tour.included.join("\n")}
                      </Text>
                      
                    </View>
                  </View>

                  <View style={styles.salaryContainer}>
                    <SalaryIcon width={20} height={20} color={colors.primary} />
                    <Text style={styles.salaryLabel}>Salary:</Text>
                    <Text style={styles.salaryValue}>{tour.salary}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.requestButton,
                    tour.requestSent && styles.requestButtonDisabled,
                  ]}
                  disabled={tour.requestSent}
                  onPress={() => !tour.requestSent && handleRequestPress(tour)}
                >
                  <Text
                    style={[
                      styles.requestButtonText,
                      tour.requestSent && styles.requestButtonTextDisabled,
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
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalSubtitle}>
              Do you want to send a request for this job?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonTextNo}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={confirmRequest}
              >
                <Text style={styles.modalButtonTextYes}>Yes, Send</Text>
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
    backgroundColor: colors.white,
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
    color: "#000",
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
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#000",
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
    backgroundColor: "#E0E0E0",
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
    borderColor: "#EEE",
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#000",
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
    color: "#000",
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#757575",
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
    color: "#8D62D7",
  },
  salaryValue: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#8D62D7",
  },
  requestButton: {
    height: 55,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonDisabled: {
    backgroundColor: "#F5F5F5",
  },
  requestButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFF",
  },
  requestButtonTextDisabled: {
    color: "#757575",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 16,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
  modalSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: "center",
    color: "#757575",
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
    backgroundColor: "#F5F5F5",
  },
  modalButtonYes: {
    backgroundColor: colors.primary,
  },
  modalButtonTextNo: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#000",
  },
  modalButtonTextYes: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFF",
  },
});

export default ActiveToursScreen;
