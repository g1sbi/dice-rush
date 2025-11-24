// Home Background Animation Configuration
// Choose between different background types and customize each one

export type BackgroundType = 
  | 'particles'      // Floating particles (current)
  | 'gradient-waves' // Animated gradient waves
  | 'starfield'      // Moving starfield
  | 'geometric'      // Floating geometric shapes
  | 'orbs'           // Glowing floating orbs
  | 'none';          // Solid color only

// ==================== COLOR PALETTE SYSTEM ====================

export type ColorPaletteName = 
  | 'cyan-magenta'   // Default: Cyan & Magenta
  | 'red-orange'      // Red & Orange
  | 'yellow-gold'     // Yellow & Gold
  | 'green-emerald'   // Green & Emerald
  | 'blue-purple'     // Blue & Purple
  | 'black-white'     // Black & White (monochrome)
  | 'pink-rose'       // Pink & Rose
  | 'neon-cyber';     // Neon Cyberpunk

export interface ColorPalette {
  name: ColorPaletteName;
  primary: string;        // Main accent color (used for buttons, highlights)
  secondary: string;      // Secondary accent color (used for secondary elements)
  background: string;     // Background base color
  backgroundDark: string; // Darker background variant
  backgroundLight: string;// Lighter background variant
  text: string;          // Primary text color
  textSecondary: string;  // Secondary text color
}

// Define all available color palettes
export const colorPalettes: Record<ColorPaletteName, ColorPalette> = {
  'cyan-magenta': {
    name: 'cyan-magenta',
    primary: '#00D4FF',      // Cyan
    secondary: '#FF00FF',    // Magenta
    background: '#0A0E27',    // Dark blue
    backgroundDark: '#050811',
    backgroundLight: '#16213e',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
  'red-orange': {
    name: 'red-orange',
    primary: '#FF4444',      // Red
    secondary: '#FF8800',     // Orange
    background: '#1A0A0A',    // Dark red-black
    backgroundDark: '#0D0505',
    backgroundLight: '#2D1414',
    text: '#FFFFFF',
    textSecondary: '#FFCCCC',
  },
  'yellow-gold': {
    name: 'yellow-gold',
    primary: '#FFD700',      // Gold
    secondary: '#FFA500',     // Orange
    background: '#1A150A',   // Dark yellow-black
    backgroundDark: '#0D0A05',
    backgroundLight: '#2D2414',
    text: '#FFFFFF',
    textSecondary: '#FFEECC',
  },
  'green-emerald': {
    name: 'green-emerald',
    primary: '#00FF88',      // Emerald green
    secondary: '#00D4AA',    // Teal
    background: '#000000',   // Pure black
    backgroundDark: '#000000',
    backgroundLight: '#0A0A0A',
    text: '#FFFFFF',
    textSecondary: '#CCFFE0',
  },
  'blue-purple': {
    name: 'blue-purple',
    primary: '#4A90E2',      // Blue
    secondary: '#9B59B6',    // Purple
    background: '#0A0E1A',   // Dark blue-black
    backgroundDark: '#050811',
    backgroundLight: '#161B2E',
    text: '#FFFFFF',
    textSecondary: '#CCD4FF',
  },
  'black-white': {
    name: 'black-white',
    primary: '#FFFFFF',      // White
    secondary: '#CCCCCC',    // Light gray
    background: '#000000',   // Black
    backgroundDark: '#000000',
    backgroundLight: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
  'pink-rose': {
    name: 'pink-rose',
    primary: '#FF69B4',      // Hot pink
    secondary: '#FF1493',    // Deep pink
    background: '#1A0A14',   // Dark pink-black
    backgroundDark: '#0D0509',
    backgroundLight: '#2D1424',
    text: '#FFFFFF',
    textSecondary: '#FFCCE0',
  },
  'neon-cyber': {
    name: 'neon-cyber',
    primary: '#00FFFF',      // Cyan
    secondary: '#FF00FF',    // Magenta
    background: '#000000',   // Pure black
    backgroundDark: '#000000',
    backgroundLight: '#0A0A0A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
};

// ==================== ACTIVE COLOR PALETTE SELECTOR ====================
// Change this to switch between color palettes
// Options: 'cyan-magenta', 'red-orange', 'yellow-gold', 'green-emerald', 
//          'blue-purple', 'black-white', 'pink-rose', 'neon-cyber'
export const activeColorPalette: ColorPaletteName = 'red-orange';

// Get the active palette colors
export const colors = colorPalettes[activeColorPalette];

// Helper function to get config with current colors
function getConfig() {
  return {
    // ==================== BACKGROUND SELECTOR ====================
    
    // Choose which background to display
    // Options: 'particles', 'gradient-waves', 'starfield', 'geometric', 'orbs', 'none'
    backgroundType: 'particles' as BackgroundType,
    
    // Background base color (uses active color palette)
    backgroundColor: colors.background,
    
    
    // ==================== PARTICLES CONFIG ====================
    
    particles: {
      // Number of particles
      // Lower = cleaner, Higher = more busy
      count: 300,
      
      // Particle size range in pixels [min, max]
      sizeRange: [0.2, 2] as [number, number],
      
      // Animation speed range in milliseconds [min, max]
      // Lower = faster movement, Higher = slower/calmer
      speedRange: [5000, 10000] as [number, number],
      
      // Maximum opacity (0.0 - 1.0)
      maxOpacity: 0.6,
      
      // Particle colors (uses active color palette)
      colors: [colors.primary, colors.secondary],
      
      // Movement direction
      // 'up' = float upwards, 'down' = fall down, 'random' = both
      direction: 'up' as 'up' | 'down' | 'random',
      
      // Enable glow effect
      enableGlow: true,
    },
    
    
    // ==================== GRADIENT WAVES CONFIG ====================
    
    gradientWaves: {
      // Number of wave layers
      layerCount: 32,
      
      // Wave colors (uses active color palette)
      colors: [colors.backgroundDark, colors.background, colors.backgroundLight],
      
      // Wave animation speed in milliseconds
      // Lower = faster waves, Higher = slower waves
      animationSpeed: 8000,
      
      // Wave height multiplier
      // Lower = flatter waves, Higher = more dramatic
      amplitude: 5.0,
      
      // Wave opacity
      opacity: 1,
    },
    
    
    // ==================== STARFIELD CONFIG ====================
    
    starfield: {
      // Number of stars
      starCount: 100,
      
      // Star size range [min, max]
      sizeRange: [1, 3] as [number, number],
      
      // Star colors (uses active color palette)
      colors: [colors.text, colors.primary, colors.secondary],
      
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
      sizeRange: [20, 60] as [number, number],
      
      // Colors (uses active color palette)
      colors: [colors.primary, colors.secondary, colors.primary],
      
      // Animation speed range [min, max]
      speedRange: [8000, 15000] as [number, number],
      
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
      sizeRange: [40, 120] as [number, number],
      
      // Colors (uses active color palette)
      colors: [colors.primary, colors.secondary, colors.primary, colors.secondary],
      
      // Movement speed range [min, max]
      speedRange: [10000, 20000] as [number, number],
      
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
  };
}

export const homeBackgroundConfig = getConfig();

// Type export for TypeScript autocomplete
export type HomeBackgroundConfig = typeof homeBackgroundConfig;

