import { homeBackgroundConfig } from '@/lib/home-background-config';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Generate random properties for particles using config
function generateParticles() {
  const config = homeBackgroundConfig.particles;
  const [minSize, maxSize] = config.sizeRange;
  const [minSpeed, maxSpeed] = config.speedRange;
  
  return Array.from({ length: config.count }).map((_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * (maxSize - minSize) + minSize,
    duration: Math.random() * (maxSpeed - minSpeed) + minSpeed,
    delay: Math.random() * 2000,
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
  }));
}

interface ParticleConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const Particle = ({ config }: { config: ParticleConfig }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const bgConfig = homeBackgroundConfig.particles;

  useEffect(() => {
    const movement = bgConfig.direction === 'up' ? -100 : 
                    bgConfig.direction === 'down' ? 100 :
                    Math.random() > 0.5 ? -100 : 100;
    
    // Vertical movement
    translateY.value = withDelay(
      config.delay,
      withRepeat(
        withTiming(movement, {
          duration: config.duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );

    // Opacity fade in/out
    opacity.value = withDelay(
      config.delay,
      withRepeat(
        withSequence(
          withTiming(bgConfig.maxOpacity, { duration: config.duration * 0.2 }),
          withTiming(bgConfig.maxOpacity, { duration: config.duration * 0.6 }),
          withTiming(0, { duration: config.duration * 0.2 })
        ),
        -1,
        false
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: config.x },
      { translateY: config.y + translateY.value },
    ],
    opacity: opacity.value,
  }));

  const glowStyle = bgConfig.enableGlow ? {
    shadowColor: config.color,
    shadowRadius: config.size * 2,
    shadowOpacity: 0.8,
  } : {};

  return (
    <Animated.View
      style={[
        styles.particle,
        style,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          backgroundColor: config.color,
          ...glowStyle,
        },
      ]}
    />
  );
};

// Generate particles once outside the component
const particles = generateParticles();

export default function BackgroundParticles() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} config={p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
  },
});

