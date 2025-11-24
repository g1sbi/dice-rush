import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ColorPalette, ColorPaletteName } from './home-background-config';
import { colorPalettes } from './home-background-config';

const THEME_STORAGE_KEY = '@daice/theme';
const DEFAULT_THEME: ColorPaletteName = 'black-white';

interface ThemeContextValue {
  theme: ColorPaletteName;
  colors: ColorPalette;
  setTheme: (theme: ColorPaletteName) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ColorPaletteName>(DEFAULT_THEME);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme && storedTheme in colorPalettes) {
          setThemeState(storedTheme as ColorPaletteName);
        }
      } catch (error) {
        // If storage fails, use default theme
        console.warn('Failed to load theme from storage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (newTheme: ColorPaletteName) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
      // Still update state even if storage fails
      setThemeState(newTheme);
    }
  };

  const colors = colorPalettes[theme];

  // Don't render children until theme is loaded to avoid flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

