# Multi-Game Hub - React Native Gaming Platform

A React Native Expo platform hosting multiple real-time multiplayer games, built with a modular architecture and Supabase Realtime.

## Games

1. **Dice Rush** - Simultaneous multiplayer dice betting game
2. **Edge** - 1-button multiplayer chicken game (early stage)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up Supabase for each game (see Setup section below)

# 3. Start the app
npx expo start

# 4. Select a game from the Game Picker screen
```

## Platform Features

- **Multi-Game Architecture**: Modular system for hosting multiple games
- **Game Picker**: Choose from available games
- **Shared Infrastructure**: Common components and utilities
- **Independent Games**: Each game maintains its own logic and state
- **Real-time Multiplayer**: Powered by Supabase Realtime

### Dice Rush Features

- Simultaneous betting on dice rolls
- 10-second rounds (5 seconds for rush rounds)
- Special bonuses and win streaks
- First to 300 points wins

### Edge Features

- 1-button chicken game mechanics
- Room-based multiplayer (2-8 players)
- Simple hold-and-release gameplay
- Lobby system with room codes

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Each game can use its own Supabase project or share a common one.

**For Dice Rush and Edge (using same credentials):**

1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings (Project Settings → API)
3. Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** 
- Use `EXPO_PUBLIC_` prefix (required for Expo)
- Never commit `.env` to git
- Restart Expo server after creating/modifying `.env`
- Both games will use the same Supabase credentials by default
- Each game manages its own database tables independently

### 3. Start the App

```bash
# Start development server
npx expo start

# Then choose your platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Press 'w' for web browser
# - Scan QR code with Expo Go app on your phone
```

For detailed setup instructions, see [SETUP.md](./documentation/SETUP.md).

## How to Play

1. **Select a Game**: Choose from the Game Picker screen
2. **Each game has its own rules:**

### Dice Rush

1. **Host a Game**: Tap "HOST GAME" to create a room and get a 6-digit code
2. **Join a Game**: Enter the 6-digit code and tap "JOIN GAME"
3. **Bet**: Choose your bet amount (10, 25, 50%, or ALL IN) and make your prediction:
   - **Normal rounds** (dice 2-5): Predict HIGHER or LOWER
   - **Edge cases** (dice 1 or 6): Choose 4 OR HIGHER or 3 OR LOWER (50/50 odds, no push)
4. **Win**: Accumulate points by correctly predicting the next dice roll
5. **Special Bonuses**:
   - **Mirror Bonus**: +10 points if both players bet the same direction and win
   - **Contrarian Bonus**: +5 points if only you win (opponent loses)
   - **Speed Bonus**: +2 points for betting first

## Game Rules

- Both players start with 100 points
- Each round shows the current dice value
- Players have 10 seconds (5 seconds on rush rounds) to bet
- Rush rounds occur randomly (33% chance) with orange timer, "RUSH ROUND" badge, and flash animation
- **Timeout Penalty**: If a player doesn't bet before the timer expires, they receive a "PASSED" status and lose points:
  - Base penalty: 10 points (if no opponent won or opponent's bet ≤21 points)
  - Dynamic penalty: If opponent won with bet >21 points, penalty = `ceil(opponentBetAmount / 2)` points
- Correct prediction: +bet amount
- Wrong prediction: -bet amount
- Push (same number): bet returned, no change
  - **Note**: Pushes only occur in normal rounds (dice 2-5)
  - Edge case rounds (dice 1 or 6) have no pushes - always win or loss
- **Visual Indicators**:
  - 👑 Crown icon appears next to the score of the player currently winning
  - HOST badge appears on the player who created the room
- Game ends when:
  - A player reaches 300 points
  - A player reaches 0 points
  - 20 rounds are completed (highest score wins)

## Deployment

### Development

```bash
# Run on device/emulator
npx expo start
```

### Production Build (EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure build
eas build:configure

# Build for production
eas build --platform all --profile production
```

### Web Deployment

```bash
# Build web bundle
npx expo export:web

# Deploy to Vercel/Netlify/etc.
```

See [DOCS.md](./DOCS.md) for detailed deployment instructions.

## Documentation

📚 **Full documentation available in the `/documentation` folder:**

- **[ARCHITECTURE.md](./documentation/ARCHITECTURE.md)** - Multi-game architecture and how to add new games
- **[DOCS.md](./documentation/DOCS.md)** - Technical documentation for Dice Rush
- **[GAME_GUIDE.md](./documentation/GAME_GUIDE.md)** - Gameplay guide
- **[QUICK_START.md](./documentation/QUICK_START.md)** - Quick start guide

### Key Topics

- Multi-game architecture and modularity
- Adding new games to the platform
- IGame interface specification
- Game registration system
- Shared vs game-specific code
- Setup and deployment

## Recent Improvements

- **Timer Synchronization**: Presence-based timer sync using Supabase Presence for accurate multiplayer timing
- **Clock Skew Immunity**: Local time tracking prevents timer desynchronization from device clock differences
- **Rush Round Enhancement**: Random 33% chance with prominent visual indicators (orange timer, badge, flash animation)

## Tech Stack

- **React Native** with Expo
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **Supabase Realtime** for multiplayer communication
- **Zustand** for state management (Dice Rush)
- **React Native Reanimated** for animations
- **Expo Haptics** for tactile feedback
- **Modular Architecture** for multi-game support

## Project Structure

```
├── app/
│   ├── index.tsx              # Landing page (redirects to game-picker)
│   ├── game-picker.tsx        # Game selection screen
│   ├── [gameId]/              # Dynamic routes for each game
│   │   ├── index.tsx          # Game home screen wrapper
│   │   └── game.tsx           # Game screen wrapper
│   └── (tabs)/                # Tab navigation (legacy Dice Rush routes)
├── src/
│   ├── app/
│   │   └── screens/           # Shared screens
│   │       └── GamePickerScreen.tsx
│   ├── games/
│   │   ├── types.ts           # IGame interface
│   │   ├── registry.ts        # Game registration
│   │   ├── dice-rush/         # Dice Rush game
│   │   │   ├── index.ts       # IGame export
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   └── lib/
│   │   └── edge/              # Edge game
│   │       ├── index.ts       # IGame export
│   │       ├── components/
│   │       ├── screens/
│   │       ├── services/
│   │       └── lib/
│   └── shared/                # Shared utilities
│       ├── components/
│       ├── services/
│       └── theme/
└── components/                # Legacy components
```

## Adding a New Game

Want to add a new game to the platform? See [ARCHITECTURE.md](./documentation/ARCHITECTURE.md) for detailed instructions.

Quick steps:

1. Create game folder in `src/games/[game-name]/`
2. Implement IGame interface
3. Create HomeScreen and GameScreen
4. Register game in `src/games/registry.ts`
5. Test and deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially multiplayer functionality)
5. Submit a pull request

## License

[Add your license here]
