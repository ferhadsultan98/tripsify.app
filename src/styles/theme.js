// src/styles/theme.js
import { colors } from './colors';

export const lightTheme = {
  mode: 'light',
  background: colors.white,
  surface: '#FFFFFF',
  textPrimary: colors.text,
  textSecondary: colors.textLight,
  border: colors.border,
  primary: colors.primary,
  primaryLight: '#EDE9FF',       // ← əlavə et
  cardBg: colors.white,
  iconColor: '#000000',
  inputBg: colors.inputBg,
  error: colors.error,
};

export const darkTheme = {
  mode: 'dark',
  background: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#333333',
  primary: '#7B5CAB',
  primaryLight: '#2E1F4A',       // ← əlavə et (dark mode üçün tünd ton)
  cardBg: '#1E1E1E',
  iconColor: '#FFFFFF',
  inputBg: '#2C2C2C',
  error: '#CF6679',
};