import React from "react";
import * as locales from "@material-ui/core/locale";
import { ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";

import { useLocalizationContext } from "common/hooks/useLocalization";

const ThemeContext = React.createContext();

export function withTheme(Component) {
  return function WithTheme(props) {
    const [isLightThemeOn, setIsLightThemeOn] = React.useState(true);

    const { language, languages } = useLocalizationContext();

    const locale = locales[languages[language].code];

    let theme;
    if (isLightThemeOn) {
      theme = createMuiTheme(
        {
          palette: {
            primary: {
              main: "#2196f3",
            },
            secondary: {
              main: "#e91e63",
            },
            background: {
              default: "#ffffff",
            },
          },
        },
        locale,
      );
    } else {
      theme = createMuiTheme(
        {
          palette: {
            primary: {
              main: "#e91e63",
            },
            secondary: {
              main: "#d500f9",
            },
            background: {
              default: "#ffffff",
            },
          },
        },
        locale,
      );
    }

    return (
      <ThemeContext.Provider
        value={{
          isLightThemeOn,
          useLightTheme: () => setIsLightThemeOn(true),
          useDarkTheme: () => setIsLightThemeOn(false),
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  };
}

export default function useAppTheme() {
  return React.useContext(ThemeContext);
}
