// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../styles/theme'; // Yuxarıda yaratdığımız fayl

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); 
  const [themeMode, setThemeMode] = useState('system'); 
  const [theme, setTheme] = useState(lightTheme);

  // 1. Tətbiq açılanda yaddaşdan oxu
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme) {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // 2. ThemeMode dəyişəndə rəngləri yenilə
  useEffect(() => {
    let activeMode = themeMode;
    if (themeMode === 'system') {
      activeMode = systemScheme || 'light';
    }
    setTheme(activeMode === 'dark' ? darkTheme : lightTheme);
  }, [themeMode, systemScheme]);

  // 3. Modu dəyişmək üçün funksiya
  const updateTheme = async (newMode) => {
    setThemeMode(newMode);
    try {
      await AsyncStorage.setItem('appTheme', newMode);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
