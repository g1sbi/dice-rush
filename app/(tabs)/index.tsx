import Background from '@/components/home/background';
import GameTitle from '@/components/home/game-title';
import HomeDice from '@/components/home/home-dice';
import ThemeMenu from '@/components/ui/theme-menu';
import { getVersionString } from '@/constants/app-info';
import { gameConfig } from '@/lib/game-config';
import { useTheme } from '@/lib/theme-context';
import { useGameState } from '@/lib/game-state';
import { logger } from '@/lib/logger';
import { roomManager } from '@/lib/room-manager';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [roomCodeError, setRoomCodeError] = useState<string | null>(null);
  const { actions, playerId } = useGameState();
  const { colors } = useTheme();

  /**
   * Sanitizes room code input by removing non-numeric characters and limiting to 6 digits.
   * 
   * @param input - The raw input string
   * @returns Sanitized string containing only digits (max 6)
   */
  const sanitizeRoomCode = (input: string): string => {
    return input.replace(/[^0-9]/g, '').slice(0, gameConfig.ROOM_CODE_LENGTH);
  };

  /**
   * Handles room code input changes with real-time sanitization.
   * 
   * @param text - The input text
   */
  const handleRoomCodeChange = (text: string) => {
    const sanitized = sanitizeRoomCode(text);
    setRoomCode(sanitized);
    // Clear error when user starts typing
    if (roomCodeError) {
      setRoomCodeError(null);
    }
  };

  /**
   * Validates room code when input loses focus.
   */
  const handleRoomCodeBlur = () => {
    setIsInputFocused(false);
    // Validate on blur if there's input but it's incomplete
    if (roomCode.length > 0 && roomCode.length !== gameConfig.ROOM_CODE_LENGTH) {
      setRoomCodeError('Room code must be 6 digits');
      // Haptic feedback for invalid input
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      setRoomCodeError(null);
    }
  };

  const handleHostGame = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const code = await roomManager.createRoom();
      actions.setRoom(code, 'host', playerId);
      router.push('/lobby');
    } catch (error) {
      logger.error('HomeScreen', 'Failed to create room', error);
      Alert.alert('Error', 'Failed to create room. Please try again.');
    }
  };

  const handleJoinGame = async () => {
    if (roomCode.length === 0) {
      return;
    }
    
    if (roomCode.length !== gameConfig.ROOM_CODE_LENGTH) {
      setRoomCodeError('Room code must be 6 digits');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Invalid Code', 'Please enter a 6-digit room code');
      return;
    }
    
    // Clear any existing errors before attempting join
    setRoomCodeError(null);

    try {
      setIsJoining(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const success = await roomManager.joinRoom(roomCode);
      
      if (success) {
        actions.setRoom(roomCode, 'guest', playerId);
        router.push('/lobby');
      } else {
        Alert.alert('Room Not Found', 'This room does not exist. Please check the code and try again.');
      }
    } catch (error) {
      logger.error('HomeScreen', 'Exception during join', error);
      Alert.alert('Error', 'Failed to join room. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <ThemeMenu />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <View style={styles.content}>
          <View style={styles.header}>
            <GameTitle />
          </View>

          {!isInputFocused && (
            <View style={styles.diceContainer}>
              <HomeDice size={170} />
            </View>
          )}

          <View style={[styles.actions, isInputFocused && styles.actionsFocused]}>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]} 
              onPress={handleHostGame}>
              <Text style={styles.primaryButtonText}>HOST GAME</Text>
            </TouchableOpacity>

            <View style={styles.joinSection}>
              <TextInput
                style={[styles.codeInput, roomCodeError && styles.codeInputError]}
                value={roomCode}
                onChangeText={handleRoomCodeChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={handleRoomCodeBlur}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#666"
                maxLength={gameConfig.ROOM_CODE_LENGTH}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={isJoining ? undefined : handleJoinGame}
                editable={!isJoining}
              />
              {roomCodeError && (
                <Text style={styles.errorText}>{roomCodeError}</Text>
              )}
              <TouchableOpacity 
                style={[
                  styles.joinButton, 
                  { borderColor: colors.secondary, shadowColor: colors.secondary },
                  isJoining && styles.joinButtonDisabled
                ]} 
                onPress={handleJoinGame}
                disabled={isJoining}
              >
                {isJoining ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.secondary} />
                    <Text style={[styles.joinButtonText, { marginLeft: 8, color: colors.secondary }]}>LOOKING FOR BRO...</Text>
                  </View>
                ) : (
                  <Text style={[styles.joinButtonText, { color: colors.secondary }]}>JOIN GAME</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.version}>{getVersionString()}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    gap: 6,
    flex: 0.25,
    justifyContent: 'center',
  },
  version: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  diceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.35,
  },
  actions: {
    width: '100%',
    gap: 16,
    flex: 0.4,
    justifyContent: 'flex-end',
  },
  actionsFocused: {
    flex: 0.8, // More space when keyboard is open
    justifyContent: 'center',
  },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  joinSection: {
    gap: 10,
  },
  codeInput: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 3,
    // Subtle glow
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  codeInputError: {
    borderColor: '#FF0000',
    borderWidth: 2,
    shadowColor: '#FF0000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  joinButtonDisabled: {
    opacity: 0.5,
    borderColor: '#666',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
