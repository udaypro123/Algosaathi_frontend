import React, {createContext, useMemo, useState, useContext, useEffect} from "react";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";

type ColorMode = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};

type BackgroundColorMode = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

export const ColorModeContext = createContext<ColorMode>({
  toggleColorMode: () => {},
  mode: 'light'
});

export const BackgroundColorContext = createContext<BackgroundColorMode>({
  backgroundColor: '#f8fafc',
  setBackgroundColor: () => {}
});

export const useBackgroundColor = () => useContext(BackgroundColorContext);
export const useColorMode = () => useContext(ColorModeContext);

export const AppThemeProvider: React.FC<{children: React.ReactNode; defaultBackgroundColor?: string}> = ({children, defaultBackgroundColor}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mode');
    return (saved === 'dark' ? 'dark' : 'light');
  });

  const [backgroundColor, setBackgroundColorState] = useState<string>(() => {
    const saved = localStorage.getItem('backgroundColor');
    return saved || defaultBackgroundColor || '#f8fafc';
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--global-bg', backgroundColor);
    document.documentElement.style.setProperty(
      '--global-text',
      mode === 'dark' ? '#e2e8f0' : '#0f172a'
    );
  }, [backgroundColor, mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('mode', next);
          return next;
        });
      },
      mode
    }),
    [mode]
  );

  const backgroundColorMode = useMemo(
    () => ({
      backgroundColor,
      setBackgroundColor: (color: string) => {
        setBackgroundColorState(color);
        localStorage.setItem('backgroundColor', color);
      }
    }),
    [backgroundColor]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: backgroundColor,
            paper: '#ffffff'
          }
        },
        typography: {
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif"
        }
      }),
    [mode, backgroundColor]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <BackgroundColorContext.Provider value={backgroundColorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BackgroundColorContext.Provider>
    </ColorModeContext.Provider>
  );
};

export default AppThemeProvider;
