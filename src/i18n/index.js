import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json"; // Asegúrate de que esta ruta sea correcta

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "es", // Cambia esto si prefieres "en-US" como fallback
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
