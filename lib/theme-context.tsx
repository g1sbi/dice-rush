import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ColorPalette, ColorPaletteName } from './home-background-config';
import { colorPalettes } from './home-background-config';

const THEME_STORAGE_KEY = '@daice/theme';
const GRAPHICS_STORAGE_KEY = '@daice/graphics';
const DEFAULT_THEME: ColorPaletteName = 'cyan-magenta';
const DEFAULT_REDUCE_ANIMATIONS = false;

interface ThemeContextValue {
  theme: ColorPaletteName;
  colors: ColorPalette;
  setTheme: (theme: ColorPaletteName) => Promise<void>;
  reduceAnimations: boolean;
  setReduceAnimations: (reduce: boolean) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ColorPaletteName>(DEFAULT_THEME);
  const [reduceAnimations, setReduceAnimationsState] = useState<boolean>(DEFAULT_REDUCE_ANIMATIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme and graphics settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [storedTheme, storedGraphics] = await Promise.all([
          AsyncStorage.getItem(THEME_STORAGE_KEY),
          AsyncStorage.getItem(GRAPHICS_STORAGE_KEY),
        ]);
        
        if (storedTheme && storedTheme in colorPalettes) {
          setThemeState(storedTheme as ColorPaletteName);
        }
        
        if (storedGraphics !== null) {
          setReduceAnimationsState(storedGraphics === 'true');
        }
      } catch (error) {
        // If storage fails, use defaults
        console.warn('Failed to load settings from storage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSettings();
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

  const setReduceAnimations = async (reduce: boolean) => {
    try {
      await AsyncStorage.setItem(GRAPHICS_STORAGE_KEY, reduce.toString());
      setReduceAnimationsState(reduce);
    } catch (error) {
      console.warn('Failed to save graphics settings to storage:', error);
      // Still update state even if storage fails
      setReduceAnimationsState(reduce);
    }
  };

  const colors = colorPalettes[theme];

  // Don't render children until settings are loaded to avoid flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, reduceAnimations, setReduceAnimations }}>
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

