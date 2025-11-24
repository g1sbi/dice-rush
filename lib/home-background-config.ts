// Home Background Animation Configuration
// Choose between different background types and customize each one

export type BackgroundType = 
  | 'particles'      // Floating particles (current)
  | 'gradient-waves' // Animated gradient waves
  | 'starfield'      // Moving starfield
  | 'geometric'      // Floating geometric shapes
  | 'orbs'           // Glowing floating orbs
  | 'none';          // Solid color only

export const homeBackgroundConfig = {
  // ==================== BACKGROUND SELECTOR ====================
  
  // Choose which background to display
  // Options: 'particles', 'gradient-waves', 'starfield', 'geometric', 'orbs', 'none'
  backgroundType: 'particles' as BackgroundType,
  
  // Background base color (used for 'none' type and as base for others)
  backgroundColor: '#0A0E27',
  
  
  // ==================== PARTICLES CONFIG ====================
  
  particles: {
    // Number of particles
    // Lower = cleaner, Higher = more busy
    count: 15,
    
    // Particle size range in pixels [min, max]
    sizeRange: [2, 6],
    
    // Animation speed range in milliseconds [min, max]
    // Lower = faster movement, Higher = slower/calmer
    speedRange: [5000, 10000],
    
    // Maximum opacity (0.0 - 1.0)
    maxOpacity: 0.6,
    
    // Particle colors (randomly picked)
    colors: ['#00D4FF', '#FF00FF'], // Cyan and Magenta
    
    // Movement direction
    // 'up' = float upwards, 'down' = fall down, 'random' = both
    direction: 'up' as 'up' | 'down' | 'random',
    
    // Enable glow effect
    enableGlow: true,
  },
  
  
  // ==================== GRADIENT WAVES CONFIG ====================
  
  gradientWaves: {
    // Number of wave layers
    layerCount: 3,
    
    // Wave colors (gradient from first to last)
    colors: ['#1a1a2e', '#16213e', '#0f3460'],
    
    // Wave animation speed in milliseconds
    // Lower = faster waves, Higher = slower waves
    animationSpeed: 8000,
    
    // Wave height multiplier
    // Lower = flatter waves, Higher = more dramatic
    amplitude: 1.0,
    
    // Wave opacity
    opacity: 0.3,
  },
  
  
  // ==================== STARFIELD CONFIG ====================
  
  starfield: {
    // Number of stars
    starCount: 100,
    
    // Star size range [min, max]
    sizeRange: [1, 3],
    
    // Star colors
    colors: ['#FFFFFF', '#00D4FF', '#FFD700'],
    
    // Movement speed (parallax effect)
    // Lower = slower, Higher = faster
    speedMultiplier: 1.0,
    
    // Twinkle effect
    enableTwinkle: true,
    
    // Twinkle speed in milliseconds
    twinkleSpeed: 2000,
  },
  
  
  // ==================== GEOMETRIC SHAPES CONFIG ====================
  
  geometric: {
    // Number of shapes
    shapeCount: 8,
    
    // Shape types to use
    // Options: 'circle', 'square', 'triangle', 'hexagon'
    shapeTypes: ['circle', 'square', 'triangle'] as Array<'circle' | 'square' | 'triangle' | 'hexagon'>,
    
    // Size range [min, max]
    sizeRange: [20, 60],
    
    // Colors
    colors: ['#00D4FF', '#FF00FF', '#00FF88'],
    
    // Animation speed range [min, max]
    speedRange: [8000, 15000],
    
    // Rotation speed (degrees per second)
    rotationSpeed: 30,
    
    // Opacity
    opacity: 0.15,
    
    // Enable borders
    enableBorders: true,
    
    // Border width
    borderWidth: 2,
  },
  
  
  // ==================== GLOWING ORBS CONFIG ====================
  
  orbs: {
    // Number of orbs
    orbCount: 6,
    
    // Orb size range [min, max]
    sizeRange: [40, 120],
    
    // Colors
    colors: ['#00D4FF', '#FF00FF', '#00FF88', '#FFD700'],
    
    // Movement speed range [min, max]
    speedRange: [10000, 20000],
    
    // Blur amount (for glow effect)
    blurRadius: 40,
    
    // Opacity
    opacity: 0.2,
    
    // Enable pulsing animation
    enablePulse: true,
    
    // Pulse speed in milliseconds
    pulseSpeed: 3000,
    
    // Movement pattern
    // 'float' = smooth floating, 'drift' = slow drift
    movement: 'float' as 'float' | 'drift',
  },
} as const;

// Type export for TypeScript autocomplete
export type HomeBackgroundConfig = typeof homeBackgroundConfig;

