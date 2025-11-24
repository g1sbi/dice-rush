// Home Dice Animation Configuration
// Adjust these values to customize the wave ripple animation behavior

export const homeDiceConfig = {
  // ==================== TIMING & SPEED ====================
  
  // How often idle ripples spawn (milliseconds)
  // Lower = more frequent ripples, Higher = calmer
  idleRippleInterval: 2500,
  
  // How long idle ripples take to fully expand and fade
  // Lower = faster ripples, Higher = slower, more graceful
  idleRippleDuration: 2000,
  
  // How often the dice value changes automatically
  // Lower = faster cycling through faces, Higher = slower
  valueChangeInterval: 5000,
  
  // Duration of the ripple burst when value changes
  // Lower = snappier transitions, Higher = smoother
  valueRippleDuration: 800,
  
  
  // ==================== PRESS ANIMATION ====================
  
  // Number of ripples that spawn when user presses
  // More = more explosive effect
  pressRippleCount: 5,
  
  // Speed of press ripples
  // Lower = faster/snappier, Higher = slower/dramatic
  pressRippleDuration: 600,
  
  // Stagger ripples (delay between each) for explosive effect
  // Set to false for instant simultaneous ripples (better tap feedback)
  staggerPressRipples: false,
  
  // How many degrees the dice rotates on press
  // 180 = half rotation, 360 = full rotation, 720 = double rotation
  pressRotationAmount: 180,
  
  // Speed of rotation on press (milliseconds)
  // Lower = faster spin, Higher = slower spin
  pressRotationDuration: 600,
  
  
  // ==================== VISUAL INTENSITY ====================
  
  // Enable/disable ripple rings on press (tap)
  // Set to true to show ripples only when user taps the dice
  enablePressRipples: true,
  
  // Enable/disable continuous idle ripples
  // Set to false to remove background ripples
  enableIdleRipples: false,
  
  // Enable/disable ripples on value change
  // Set to false to remove ripples when dice value changes
  enableValueChangeRipples: false,
  
  // Enable/disable wave distortion on ripples
  // Set to false to disable skew/stretch effects (only if ripples are enabled)
  enableWaveDistortion: false,
  
  // How large ripples expand (multiplier)
  // 1.0 = no expansion, 2.5 = expands to 2.5x size, Higher = larger ripples
  rippleExpandScale: 2.5,
  
  // Wave distortion intensity in degrees (skew amount)
  // Lower = subtle wave, Higher = more dramatic distortion
  // Recommended range: 3-15
  // Set to 0 to disable skew while keeping stretch
  waveAmplitude: 0,
  
  // Scale wave variation (how much ripples stretch)
  // Lower = subtle, Higher = more pronounced stretching
  // Recommended range: 0.05-0.3
  // Set to 0 to disable stretch while keeping skew
  waveDistortion: 0.15,
  
  
  // ==================== SPRING PHYSICS (BOUNCINESS) ====================
  
  // Press burst animation spring
  pressBurst: {
    // How much the dice scales up on press
    // 1.0 = no scale, 1.2 = 20% larger, Higher = more dramatic
    scaleAmount: 1.2,
    
    // Damping: Lower = more bouncy, Higher = less bouncy
    // Recommended range: 5-20
    damping: 8,
    
    // Stiffness: Higher = faster/snappier, Lower = slower/smoother
    // Recommended range: 100-500
    stiffness: 300,
  },
  
  // Return to normal animation spring
  returnToNormal: {
    // Damping: Higher = smoother return with less bounce
    // Recommended range: 10-25
    damping: 20,
    
    // Stiffness: Lower = gentler return
    // Recommended range: 100-300
    stiffness: 250,
  },
  
  
  // ==================== VISUAL STYLING ====================
  
  rippleStyle: {
    // Roundness of ripple rings
    borderRadius: 60,
    
    // Thickness of ripple ring borders
    borderWidth: 2,
    
    // Color and opacity of ripples (RGBA format)
    // Adjust alpha (last value) for transparency: 0.0-1.0
    borderColor: 'rgba(255, 255, 255, 0.4)',
    
    // Fill color of ripples ('transparent' recommended)
    backgroundColor: 'transparent',
  },
  
  
  // ==================== DICE SIZE ====================
  
  // Default size of the dice in pixels
  defaultSize: 120,
} as const;

// Type export for TypeScript autocomplete
export type HomeDiceConfig = typeof homeDiceConfig;

