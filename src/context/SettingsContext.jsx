// src/context/SettingsContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [biometricID, setBiometricID] = useState(false);
  const [faceID, setFaceID] = useState(false);
  const [smsAuthenticator, setSmsAuthenticator] = useState(false);
  const [googleAuthenticator, setGoogleAuthenticator] = useState(false);

  // Yüklənmə zamanı oxu
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedBiometricID = await AsyncStorage.getItem('biometricID');
        const savedFaceID = await AsyncStorage.getItem('faceID');
        const savedSms = await AsyncStorage.getItem('smsAuthenticator');
        const savedGoogle = await AsyncStorage.getItem('googleAuthenticator');

        if (savedBiometricID === 'true') setBiometricID(true);
        if (savedFaceID === 'true') setFaceID(true);
        if (savedSms === 'true') setSmsAuthenticator(true);
        if (savedGoogle === 'true') setGoogleAuthenticator(true);
      } catch (error) {
        console.log('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Dəyişdirmə funksiyaları
  const updateBiometricID = async (value) => {
    setBiometricID(value);
    await AsyncStorage.setItem('biometricID', value ? 'true' : 'false');
  };

  const updateFaceID = async (value) => {
    setFaceID(value);
    await AsyncStorage.setItem('faceID', value ? 'true' : 'false');
  };

  const updateSmsAuthenticator = async (value) => {
    setSmsAuthenticator(value);
    await AsyncStorage.setItem('smsAuthenticator', value ? 'true' : 'false');
  };

  const updateGoogleAuthenticator = async (value) => {
    setGoogleAuthenticator(value);
    await AsyncStorage.setItem('googleAuthenticator', value ? 'true' : 'false');
  };

  return (
    <SettingsContext.Provider
      value={{
        biometricID,
        faceID,
        smsAuthenticator,
        googleAuthenticator,
        updateBiometricID,
        updateFaceID,
        updateSmsAuthenticator,
        updateGoogleAuthenticator,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);