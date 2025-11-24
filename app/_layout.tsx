import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import '../polyfills';

// Import configuration overrides (must be imported early to apply before game starts)
import '@games/dice-rush/lib/config-overrides';

// Only import react-native-get-random-values on native platforms
if (Platform.OS !== 'web') {
  require('react-native-get-random-values');
}

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@shared/theme/ThemeContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="game-picker" options={{ headerShown: false }} />
          <Stack.Screen name="lobby" options={{ headerShown: false }} />
          <Stack.Screen name="[gameId]" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}
