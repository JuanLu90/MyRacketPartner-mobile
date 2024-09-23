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
    // Localization.getLocales() devuelve un array, toma el primer elemento y extrae el código de idioma
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      savedLanguage = locales[0].languageCode; // Puedes cambiar a `languageTag` si prefieres "en-US"
    } else {
      savedLanguage = "en"; // Idioma por defecto
    }
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
