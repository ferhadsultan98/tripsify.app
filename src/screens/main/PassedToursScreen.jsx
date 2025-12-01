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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../../assets/images/searchIcon.svg";
import LogoIcon from "../../../assets/images/tripsifyLogo.svg";
import PlaneIcon from "../../../assets/images/planeIcon.svg";
import CalendarIcon from "../../../assets/images/calendarIcon.svg";
import PeriodIcon from "../../../assets/images/periodIcon.svg";
import PeopleIcon from "../../../assets/images/peopleIcon.svg";
import CarIcon from "../../../assets/images/carIcon.svg";
import StarIcon from "../../../assets/images/starIcon.svg";
import EmptyState from "./EmptyState";
import { completedTours } from "../../data/toursData";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import SalaryIcon from "../../../assets/images/salaryIcon.svg"; 

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PassedToursScreen = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchVisible(!searchVisible);
  };

  const tours = completedTours || [];

  const currentRoute = navigation?.getState()?.routes[navigation.getState().index]?.name || "Passed Tours";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LogoIcon width={32} height={32} />
        <Text style={styles.headerTitle}>{currentRoute}</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <SearchIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
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

      {/* Empty State or Tours List */}
      {tours.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tours.map((tour) => (
            <View key={tour.id} style={styles.tourItem}>
              {/* Left Icon + Vertical Line */}
              <View style={styles.leftColumn}>
                <PlaneIcon width={24} height={24} />
                <View style={styles.verticalLine} />
              </View>

              {/* Right Content */}
              <View style={styles.rightColumn}>
                {/* Card */}
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

                 <View style={styles.salaryContainer}>
                                                       <SalaryIcon width={20} height={20} color={colors.primary} />
                                                       <Text style={styles.salaryLabel}>Salary:</Text>
                                                       <Text style={styles.salaryValue}>{tour.salary}</Text>
                                                     </View>
                  
                  <View style={styles.ratingContainer}>
                    <StarIcon width={20} height={20} fill="#FFC107" />
                    <Text style={styles.ratingText}>{tour.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  ratingText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: '#000',
  },
});

export default PassedToursScreen;
