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
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PassedToursScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Theme Hook
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchVisible(!searchVisible);
  };

  const tours = completedTours || [];

  const currentRoute = navigation?.getState()?.routes[navigation.getState().index]?.name || "Passed Tours";

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <LogoIcon width={32} height={32} />
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>{currentRoute}</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <SearchIcon width={24} height={24} fill={theme.iconColor} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
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
                <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />
              </View>

              {/* Right Content */}
              <View style={styles.rightColumn}>
                {/* Card */}
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

                  <View style={styles.salaryContainer}>
                    <SalaryIcon width={20} height={20} color={theme.primary} />
                    <Text style={[styles.salaryLabel, { color: theme.primary }]}>Salary:</Text>
                    <Text style={[styles.salaryValue, { color: theme.primary }]}>{tour.salary}</Text>
                  </View>
                  
                  <View style={styles.ratingContainer}>
                    <StarIcon width={20} height={20} fill="#FFC107" />
                    <Text style={[styles.ratingText, { color: theme.textPrimary }]}>{tour.rating}</Text>
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  ratingText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: '#000', // Dinamik
  },
});

export default PassedToursScreen;
