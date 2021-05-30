import React from "react";
import { useTranslation } from "react-i18next";

const LocalizationContext = React.createContext();

export function withLocalization(Component) {
  return function WithLocalization(props) {
    const { t, i18n } = useTranslation();

    const languages = {
      ru: { code: "ruRU", name: "Русский" },
      en: { code: "enUS", name: "English" },
    };

    return (
      <LocalizationContext.Provider
        value={{
          language: i18n.language,
          languages,
          setLanguage: (lang) => i18n.changeLanguage(lang),
          l: t,
        }}
      >
        <Component {...props} />
      </LocalizationContext.Provider>
    );
  };
}

export function useLocalizationContext() {
  return React.useContext(LocalizationContext);
}

export default function useLocalization() {
  const { l } = useLocalizationContext();
  return l;
}
