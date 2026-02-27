import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import ActiveToursScreen from "../screens/main/ActiveToursScreen";
import MyToursScreen from "../screens/main/MyToursScreen";
import PassedToursScreen from "../screens/main/PassedToursScreen";
import SettingsScreen from "../screens/main/SettingsScreen";
import ActiveToursIcon from "../../assets/images/globalTourIcon.svg";
import MyToursIcon from "../../assets/images/myTourIcon.svg";
import PassedToursIcon from "../../assets/images/passedTourIcon.svg";
import SettingsIcon from "../../assets/images/settingsIcon.svg";
import { useTheme } from "../context/ThemeContext";
import { useWindowDimensions } from "react-native";

const Tab = createBottomTabNavigator();

const SPRING = { damping: 20, stiffness: 180, mass: 0.8 };

function TabItem({ route, index, state, navigation, theme }) {
  const isFocused = state.index === index;

  const focused = useSharedValue(isFocused ? 1 : 0);

  React.useEffect(() => {
    focused.value = withSpring(isFocused ? 1 : 0, SPRING);
  }, [isFocused]);

  const icons = {
    "Active Tours": ActiveToursIcon,
    MyTours: MyToursIcon,
    PassedTours: PassedToursIcon,
    Settings: SettingsIcon,
  };

  const labels = {
    "Active Tours": "Active Tours",
    MyTours: "My Tours",
    PassedTours: "Passed Tours",
    Settings: "Settings",
  };

  const IconComponent = icons[route.name];
  const label = labels[route.name];

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  // Orijinaldakı kimi flex: focused ? 2 : 1
  const containerStyle = useAnimatedStyle(() => ({
    flex: withSpring(isFocused ? 2 : 1, SPRING),
    alignItems: "center",
  }));

  // Background smooth
  const pillStyle = useAnimatedStyle(() => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: withSpring(isFocused ? 14 : 10, SPRING),
    gap: withSpring(isFocused ? 6 : 0, SPRING),
   backgroundColor: withTiming(
  isFocused ? (theme.primaryLight ?? "#EDE9FF") : "#00000000",
  { duration: 250 }
),
  }));

  // Label smooth görünür/gizlənir
  const labelStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
    maxWidth: withSpring(isFocused ? 120 : 0, SPRING),
    overflow: "hidden",
  }));

  return (
    <Animated.View style={containerStyle}>
      <Animated.View onTouchEnd={onPress} style={pillStyle}>
        <IconComponent
          width={22}
          height={22}
          color={isFocused ? theme.primary : theme.textSecondary}
        />
        <Animated.View style={labelStyle}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: theme.primary,
            }}
            numberOfLines={1}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

function CustomTabBar({ state, descriptors, navigation, insets, theme }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 70 + insets.bottom,
        paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
        paddingTop: 10,
        paddingHorizontal: 12,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        backgroundColor: theme.cardBg,
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 0,
      }}
    >
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          route={route}
          index={index}
          state={state}
          navigation={navigation}
          theme={theme}
        />
      ))}
    </View>
  );
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <CustomTabBar {...props} insets={insets} theme={theme} />
      )}
    >
      <Tab.Screen name="Active Tours" component={ActiveToursScreen} />
      <Tab.Screen name="MyTours" component={MyToursScreen} />
      <Tab.Screen name="PassedTours" component={PassedToursScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}