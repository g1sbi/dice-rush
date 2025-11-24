import Background from '@shared/components/background';
import ThemeMenu from '@/components/ui/theme-menu';
import { GAMES } from '@games/registry';
import { useTheme } from '@shared/theme/ThemeContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function GamePickerScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleGameSelect = (gameId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/${gameId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <ThemeMenu />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Game</Text>
        </View>

        <View style={styles.gamesGrid}>
          {GAMES.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[styles.gameCard, { borderColor: colors.primary }]}
              onPress={() => handleGameSelect(game.id)}
              activeOpacity={0.8}>
              <Image source={game.thumbnail} style={styles.thumbnail} />
              <View style={styles.gameInfo}>
                <Text style={styles.gameName}>{game.name}</Text>
                <Text style={styles.gamePlayers}>
                  {game.minPlayers}-{game.maxPlayers} Players
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  gamesGrid: {
    gap: 20,
  },
  gameCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
  },
  gameInfo: {
    padding: 16,
    gap: 4,
  },
  gameName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gamePlayers: {
    fontSize: 14,
    color: '#888',
  },
});

