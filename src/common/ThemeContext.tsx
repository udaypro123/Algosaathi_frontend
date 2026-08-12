import React, {createContext, useMemo, useState} from "react";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";

type ColorMode = {
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorMode>({
  toggleColorMode: () => {}
});

export const AppThemeProvider: React.FC<any> = ({children}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mode');
    return (saved === 'dark' ? 'dark' : 'light');
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('mode', next);
          return next;
        });
      }
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
        typography: {
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif"
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppThemeProvider;
