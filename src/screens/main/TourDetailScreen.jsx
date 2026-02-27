import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";
import PagerView from "react-native-pager-view"; // Import PagerView
import ScreenHeader from "../../components/common/ScreenHeader";
import { fontFamily } from "../../styles/fonts";
import DetailsTab from "./DetailsTab";
import ScheduleTab from "./ScheduleTab";
import RequirementsTab from "./RequirementsTab";
import { useTheme } from "../../context/ThemeContext"; // Theme Hook

const TourDetailScreen = ({ route, navigation }) => {
  const { theme } = useTheme(); // Theme Hook
  const { tour } = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "details", title: "Details" },
    { key: "schedule", title: "Schedule" },
    { key: "requirements", title: "Requirements" },
  ]);

  const renderScene = ({ route }) => {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {route.key === "details" ? (
          <DetailsTab tour={tour} />
        ) : route.key === "schedule" ? (
          <ScheduleTab tour={tour} />
        ) : (
          <RequirementsTab />
        )}
      </ScrollView>
    );
  };

  const renderTabBar = (props) => {
    const tabWidth = (layout.width - 48) / routes.length;
    const indicatorPosition = props.position.interpolate({
      inputRange: routes.map((_, i) => i),
      outputRange: routes.map((_, i) => i * tabWidth),
    });

    return (
      <View style={[styles.tabBar, { backgroundColor: theme.inputBg }]}>
        <Animated.View
          style={[
            styles.indicator,
            { 
                transform: [{ translateX: indicatorPosition }],
                backgroundColor: theme.primary 
            },
          ]}
        />
        {props.navigationState.routes.map((route, i) => (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => props.jumpTo(route.key)}
          >
            <Text 
                style={[
                    styles.tabText, 
                    { color: theme.textSecondary }, // Passiv rəng
                    index === i && { color: '#FFFFFF' } // Aktiv rəng (həmişə ağ)
                ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    // SafeAreaView fon rəngi dinamik
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScreenHeader
        title="Tour Details"
        onBackPress={() => navigation.goBack()}
        showProgress={false}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ flex: 1 }}
        renderPager={(props) => <PagerView {...props} style={{ flex: 1 }} />}
        // Optimization props for smooth swiping
        lazy
        lazyPreloadDistance={1}
      />

      <View style={[styles.footer, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>
        <TouchableOpacity style={[styles.footerButton, { backgroundColor: theme.primary }]}>
          <Text style={[styles.footerButtonText, { color: '#FFFFFF' }]}>
            Send Request For This Tour
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  tabBar: {
    flexDirection: "row",
    position: "relative",
    // backgroundColor: "#F0F0F0", // Dinamik
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  indicator: {
    position: "absolute",
    width: "33.33%",
    height: "100%",
    // backgroundColor: colors.primary, // Dinamik
    borderRadius: 8,
  },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center" },
  tabText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    // color: colors.text, // Dinamik
  },
  // activeTabText: { color: colors.white }, // Inline stilə köçürüldü
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 30,
    // backgroundColor: "white", // Dinamik
    borderTopWidth: 1,
    // borderTopColor: "#F0F0F0", // Dinamik
  },
  footerButton: {
    height: 55,
    borderRadius: 12,
    // backgroundColor: colors.primary, // Dinamik
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    // color: "white", // Dinamik
  },
});

export default TourDetailScreen;
