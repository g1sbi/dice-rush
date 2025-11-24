import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import EdgeLobby from './EdgeLobby';

export default function EdgeGame() {
  const router = useRouter();
  const { roomCode } = useLocalSearchParams<{ roomCode?: string }>();

  // If we have a room code, show the lobby
  if (roomCode) {
    return <EdgeLobby roomCode={roomCode} />;
  }

  // Otherwise show placeholder
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edge Game</Text>
      <Text style={styles.subtitle}>Coming Soon!</Text>
      <Text style={styles.description}>
        The gameplay screen is under development.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 16,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

