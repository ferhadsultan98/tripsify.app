import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';

// JSON Faylları
import en from './locales/en.json';
import az from './locales/az.json';
import ru from './locales/ru.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';
import ua from './locales/ua.json';

const RESOURCES = {
  en: { translation: en },
  az: { translation: az },
  ru: { translation: ru },
  ar: { translation: ar },
  tr: { translation: tr },
  ua: { translation: ua },
};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // 1. Əvvəlcə baxırıq: İstifadəçi əvvəllər özü dil seçibmi?
      const userSelectedLanguage = await AsyncStorage.getItem('user-language');
      
      if (userSelectedLanguage) {
        // Seçibsə onu qaytarırıq
        return callback(userSelectedLanguage);
      }

      // 2. Seçməyibsə (ilk dəfə girirsə), telefonun dilini tapırıq
      const locales = RNLocalize.getLocales();
      let phoneLanguage = 'en'; // Default

      if (locales && locales.length > 0) {
        phoneLanguage = locales[0].languageCode;
      }

      // Əgər telefonun dili bizdə varsa (məs: 'az'), onu istifadə et. Yoxdursa (məs: 'fr'), 'en' işlət.
      const finalLanguage = RESOURCES[phoneLanguage] ? phoneLanguage : 'en';
      
      // 3. RTL yoxlanışı (Çox vacib!)
      // Əgər telefon Ərəbcədirsə və tətbiq RTL rejimində deyilsə, avtomatik RTL-ə keçirməliyik.
      const isRTL = finalLanguage === 'ar';
      if (isRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        // Qeyd: İlk açılışda restart etməyə ehtiyac yoxdur, React Native özü render edir.
      }

      return callback(finalLanguage);

    } catch (error) {
      console.log('Language detection error:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Language caching error:', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: RESOURCES,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
