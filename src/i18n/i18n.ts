import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './ar.json';
import en from './en.json';

const LANGUAGE_KEY = 'selected_language';

const LANGUAGE_DIRECTION: Record<string, string> = {
  en: 'ltr',
  ar: 'rtl',
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: localStorage.getItem(LANGUAGE_KEY) || 'en', // Load language from local storage or fallback to 'en'
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

// Save the language to local storage when it's changed
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_KEY, lng);
  const direction = LANGUAGE_DIRECTION[lng] || 'ltr';
  localStorage.setItem('direction', direction);
  // document.documentElement.dir = direction;
});

export default i18n;
