import { useLocalSearchParams } from 'expo-router';
import { getGameById } from '@games/registry';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GameHomeWrapper() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const game = getGameById(gameId);

  if (!game) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Game not found</Text>
      </View>
    );
  }

  const HomeScreen = game.HomeScreen;
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

