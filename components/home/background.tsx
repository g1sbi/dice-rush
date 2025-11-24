import { homeBackgroundConfig } from '@/lib/home-background-config';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BackgroundParticles from './background-particles';

// Background selector component that renders the appropriate background
// based on the config
export default function Background() {
  const { backgroundType, backgroundColor } = homeBackgroundConfig;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {backgroundType === 'particles' && <BackgroundParticles />}
      {backgroundType === 'gradient-waves' && <ComingSoonPlaceholder type="Gradient Waves" />}
      {backgroundType === 'starfield' && <ComingSoonPlaceholder type="Starfield" />}
      {backgroundType === 'geometric' && <ComingSoonPlaceholder type="Geometric" />}
      {backgroundType === 'orbs' && <ComingSoonPlaceholder type="Orbs" />}
      {/* 'none' type just shows backgroundColor */}
    </View>
  );
}

// Placeholder for backgrounds not yet implemented
function ComingSoonPlaceholder({ type }: { type: string }) {
  return (
    <View style={styles.placeholder} pointerEvents="none">
      {/* Empty placeholder - background types to be implemented */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
  },
});

