import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import '../polyfills';

// Import configuration overrides (must be imported early to apply before game starts)
import '@/lib/config-overrides';

// Only import react-native-get-random-values on native platforms
if (Platform.OS !== 'web') {
  require('react-native-get-random-values');
}

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/lib/theme-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}
