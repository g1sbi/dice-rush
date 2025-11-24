import Dice from '@/components/game/dice-2d';
import { useTheme } from '@/lib/theme-context';
import type { ColorPaletteName } from '@/lib/home-background-config';
import { colorPalettes } from '@/lib/home-background-config';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const THEME_ALIASES: Record<ColorPaletteName, string> = {
  'cyan-magenta': 'Rush',
  'red-orange': 'Vulkan',
  'yellow-gold': 'Danger',
  'green-emerald': 'Emerald',
  'blue-purple': 'Galaxy',
  'black-white': 'Noir',
  'pink-rose': 'Shock',
  'neon-cyber': 'Neon',
};

const DICE_ICON_SIZE = 40;

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scale = useSharedValue(1);

  const handleDicePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsModalVisible(true);
  };

  const handleThemeSelect = async (selectedTheme: ColorPaletteName) => {
    if (selectedTheme === theme) {
      setIsModalVisible(false);
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await setTheme(selectedTheme);
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsModalVisible(false);
  };

  const diceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleDicePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handleDicePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <>
      <Pressable
        onPress={handleDicePress}
        onPressIn={handleDicePressIn}
        onPressOut={handleDicePressOut}
        style={styles.diceButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Animated.View style={diceAnimatedStyle}>
          <Dice value={5} size={DICE_ICON_SIZE} variant="solid" />
        </Animated.View>
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Theme</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.themeGrid}>
              {(Object.keys(colorPalettes) as ColorPaletteName[]).map((themeKey) => {
                const palette = colorPalettes[themeKey];
                const alias = THEME_ALIASES[themeKey];
                const isActive = theme === themeKey;

                return (
                  <TouchableOpacity
                    key={themeKey}
                    style={[
                      styles.themeCard,
                      isActive && styles.themeCardActive,
                      { borderColor: palette.primary },
                    ]}
                    onPress={() => handleThemeSelect(themeKey)}>
                    <View style={styles.colorPreview}>
                      <View
                        style={[
                          styles.colorSwatch,
                          { backgroundColor: palette.primary },
                        ]}
                      />
                      <View
                        style={[
                          styles.colorSwatch,
                          { backgroundColor: palette.secondary },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.themeName,
                        isActive && { color: palette.primary },
                      ]}>
                      {alias}
                    </Text>
                    {isActive && (
                      <View style={[styles.activeIndicator, { backgroundColor: palette.primary }]} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  diceButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#333',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '47%',
    aspectRatio: 1.2,
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  themeCardActive: {
    borderWidth: 2,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

