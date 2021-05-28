import React from "react";
import { useTranslation } from "react-i18next";

const LocalizationContext = React.createContext();

function ProvideLocalization({ children }) {
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
      {children}
    </LocalizationContext.Provider>
  );
}

export function withLocalization(Component) {
  return function WithLocalization(props) {
    return (
      <ProvideLocalization>
        <Component {...props} />
      </ProvideLocalization>
    );
  };
}

export function useLocalizationContext() {
  return React.useContext(LocalizationContext);
}

export default function useLocalization() {
  const { t } = useTranslation();
  return t;
}
