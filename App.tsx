import React from "react";
import { StatusBar, useColorScheme } from "react-native";
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
import AboutUsScreen from "./src/screens/main/AboutUsScreen.jsx";
import LanguageSelectionScreen from "./src/screens/main/LanguageSelectionScreen.jsx";
import './src/i18n/index.js';


import { initNotifications } from "./src/services/notifications";
import { useModernAppUpdate } from "./src/services/updateChecker";


// Theme Provider-i import edirik
import { ThemeProvider, useTheme } from "./src/context/ThemeContext.js";
// Auth Provider-i import edirik (YENİ)
import { AuthProvider } from "./src/context/AuthContext.jsx";
import { SettingsProvider } from './src/context/SettingsContext';


const Stack = createNativeStackNavigator();


// Naviqasiya komponentini ayrıca funksiyaya çıxarırıq ki, useTheme hook-unu istifadə edə bilək
const MainNavigator = () => {
  const { theme, themeMode } = useTheme();
  const systemScheme = useColorScheme();
  
  // Status Bar stili: Əgər dark mode-dursa 'light-content', yoxsa 'dark-content'
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');
  const barStyle = isDark ? 'light-content' : 'dark-content';


  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={theme.background}
        translucent={false}
      />
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            // Ekranların arxa fon rəngini dinamik edirik
            contentStyle: { backgroundColor: theme.background },
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
          <Stack.Screen
            name="AboutUsScreen"
            component={AboutUsScreen}
          />
          <Stack.Screen
            name="LanguageSelectionScreen"
            component={LanguageSelectionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


// Yeni AppContent komponenti: useModernAppUpdate burada çağrılır
const AppContent = () => {
  const [updateUIModals] = useModernAppUpdate();


  return (
    <>
      <MainNavigator />
      {updateUIModals}
    </>
  );
};


export default function App() {
  React.useEffect(() => {
    initNotifications();
  }, []);


  return (
    // ThemeProvider ən üstdə olmalıdır, sonra AuthProvider
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
        </SettingsProvider>
    </ThemeProvider>
  );
}
