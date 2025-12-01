import React from "react";
import { Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActiveToursScreen from "../screens/main/ActiveToursScreen";
import MyToursScreen from "../screens/main/MyToursScreen";
import PassedToursScreen from "../screens/main/PassedToursScreen";
import SettingsScreen from "../screens/main/SettingsScreen";
import ActiveToursIcon from "../../assets/images/globalTourIcon.svg";
import MyToursIcon from "../../assets/images/myTourIcon.svg";
import PassedToursIcon from "../../assets/images/passedTourIcon.svg";
import SettingsIcon from "../../assets/images/settingsIcon.svg";
import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          height: 80 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          backgroundColor: "#FFFFFF",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Active Tours"
        component={ActiveToursScreen}
        options={{
          tabBarLabel: "Active Tours",
          tabBarIcon: ({ focused }) => (
            <ActiveToursIcon
              width={22}
              height={22}
              color={focused ? colors.primary : "#9E9E9E"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyTours"
        component={MyToursScreen}
        options={{
          tabBarLabel: "My Tours",
          tabBarIcon: ({ focused }) => (
            <MyToursIcon
              width={22}
              height={22}
              color={focused ? colors.primary : "#9E9E9E"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PassedTours"
        component={PassedToursScreen}
        options={{
          tabBarLabel: "Passed Tours",
          tabBarIcon: ({ focused }) => (
            <PassedToursIcon
              width={22}
              height={22}
              color={focused ? colors.primary : "#9E9E9E"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <SettingsIcon
              width={22}
              height={22}
              color={focused ? colors.primary : "#9E9E9E"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
