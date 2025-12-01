import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import LoginFormScreen from "./src/screens/auth/LoginFormScreen";
import SignUpFormScreen from "./src/screens/auth/SignUpFormScreen";
import SignUpVerificationScreen from "./src/screens/auth/SignUpVerificationScreen";
import VerificationCodeScreen from "./src/screens/auth/VerificationCodeScreen";
import PersonalInfoScreen from "./src/screens/auth/PersonalInfoScreen";
import DocumentsScreen from "./src/screens/auth/DocumentsScreen";
import PaymentDetailsScreen from "./src/screens/auth/PaymentDetailsScreen";
import ExploreScreen from "./src/screens/auth/ExploreScreen";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import TermsOfServiceScreen from "./src/screens/auth/TermsOfServiceScreen";
import PrivacyPolicyScreen from "./src/screens/auth/PrivacyPolicyScreen";
import ProfileEditScreen from "./src/screens/auth/ProfileEditScreen";
import AccountSecurityScreen from "./src/screens/main/AccountSecurityScreen";
import AppAppearanceScreen from "./src/screens/main/AppAppearanceScreen";
import HelpSupportScreen from "./src/screens/main/HelpSupportScreen";
import FAQScreen from "./src/screens/main/FAQScreen";
import ContactSupportScreen from "./src/screens/main/ContactSupportScreen";
import TourDetailScreen from "./src/screens/main/TourDetailScreen";
import PaymentMethodsScreen from "./src/screens/main/PaymentMethodsScreen";
import DeviceManagementScreen from "./src/screens/main/DeviceManagementScreen";
import './src/i18n/index.js'

import { initNotifications } from "./src/services/notifications";
import { useModernAppUpdate } from "./src/services/updateChecker";

const Stack = createNativeStackNavigator();

export default function App() {
  const [updateUIModals] = useModernAppUpdate();

  React.useEffect(() => {
    initNotifications();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
     
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginFormScreen" component={LoginFormScreen} />
          <Stack.Screen name="SignUpFormScreen" component={SignUpFormScreen} />
          <Stack.Screen
            name="SignUpVerificationScreen"
            component={SignUpVerificationScreen}
          />
          <Stack.Screen
            name="VerificationCodeScreen"
            component={VerificationCodeScreen}
          />
          <Stack.Screen
            name="PersonalInfoScreen"
            component={PersonalInfoScreen}
          />
          <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
          <Stack.Screen
            name="PaymentDetailsScreen"
            component={PaymentDetailsScreen}
          />
          <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen
            name="TermsOfService"
            component={TermsOfServiceScreen}
            options={{ animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{ animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="ProfileEditScreen"
            component={ProfileEditScreen}
          />
          <Stack.Screen
            name="AccountSecurityScreen"
            component={AccountSecurityScreen}
          />
          <Stack.Screen
            name="AppAppearanceScreen"
            component={AppAppearanceScreen}
          />
          <Stack.Screen
            name="HelpSupportScreen"
            component={HelpSupportScreen}
          />
          <Stack.Screen name="FAQScreen" component={FAQScreen} />
          <Stack.Screen
            name="ContactSupportScreen"
            component={ContactSupportScreen}
          />
          <Stack.Screen name="TourDetailScreen" component={TourDetailScreen} />
          <Stack.Screen
            name="PaymentMethodsScreen"
            component={PaymentMethodsScreen}
          />
          <Stack.Screen
            name="DeviceManagementScreen"
            component={DeviceManagementScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
       {updateUIModals}
    </>
  );
}
