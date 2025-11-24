# Setup Guide

Complete setup instructions for the Multi-Game Platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Supabase Configuration](#supabase-configuration)
4. [Running the App](#running-the-app)
5. [Testing Multiplayer](#testing-multiplayer)
6. [Development Workflow](#development-workflow)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Optional (for native development)

- **Xcode** (macOS only) for iOS development
- **Android Studio** for Android development
- **Expo Go** app on your mobile device

### Accounts

- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))
- **Expo Account** (optional, for EAS builds)

## Installation

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd dAIce-game
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React Native and Expo
- Supabase client
- Zustand (state management)
- React Native Reanimated
- Expo Router
- Game-specific dependencies

**Installation time:** ~2-5 minutes depending on connection speed

## Supabase Configuration

### Why Supabase?

Both games use Supabase Realtime for multiplayer functionality:
- WebSocket-based real-time communication
- No custom backend required
- Free tier sufficient for development

### Setup Process

#### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: e.g., "dice-games"
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your location
   - **Pricing Plan**: Free tier is sufficient
5. Click "Create new project"
6. Wait 2-3 minutes for project initialization

#### 2. Get API Credentials

1. Navigate to **Project Settings** (gear icon)
2. Go to **API** section
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

#### 3. Create Environment File

Create a `.env` file in the project root:

```bash
# On macOS/Linux
touch .env

# On Windows
type nul > .env
```

#### 4. Add Credentials

Open `.env` and add your credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important Notes:**

- Use the `EXPO_PUBLIC_` prefix (required by Expo)
- Never commit `.env` to version control
- Both games will use these credentials by default
- Each game manages its own database tables

#### 5. Configure Database (Optional)

For Edge game, you may need to set up database tables. See game-specific documentation.

### Using Separate Supabase Projects

If you want different projects for each game:

1. Create two Supabase projects (e.g., "dice-rush" and "edge-game")
2. Modify game-specific Supabase initialization:

**For Edge:**
Edit `src/games/edge/lib/supabase.ts`:
```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_EDGE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_EDGE_SUPABASE_ANON_KEY || '';
```

Then add to `.env`:
```env
EXPO_PUBLIC_EDGE_SUPABASE_URL=https://edge-project.supabase.co
EXPO_PUBLIC_EDGE_SUPABASE_ANON_KEY=your_edge_anon_key
```

## Running the App

### Start Development Server

```bash
npm start
```

Or use Expo CLI directly:

```bash
npx expo start
```

This will:
- Start Metro bundler
- Open Expo DevTools in your browser
- Display a QR code for mobile connection

### Run on Different Platforms

#### Mobile Device (Expo Go)

**Easiest method for quick testing:**

1. Install **Expo Go** from App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in terminal
3. App loads on your device

**Pros:**
- Fastest setup
- No native tooling required

**Cons:**
- Limited to Expo SDK features
- Cannot test custom native modules

#### iOS Simulator (macOS only)

```bash
# Press 'i' in Expo CLI
# Or run directly:
npx expo start --ios
```

**Requirements:**
- Xcode installed
- iOS Simulator configured

#### Android Emulator

```bash
# Press 'a' in Expo CLI
# Or run directly:
npx expo start --android
```

**Requirements:**
- Android Studio installed
- Android emulator created and running

#### Web Browser

```bash
# Press 'w' in Expo CLI
# Or run directly:
npx expo start --web
```

Opens in default browser. Good for quick UI testing, but multiplayer features may behave differently than native.

## Testing Multiplayer

### Two Device Setup

**Required:** 2 physical devices OR 1 device + 1 simulator

#### Testing Dice Rush

1. **Device 1 (Host):**
   - Open app
   - Select "Dice Rush" from Game Picker
   - Tap "HOST GAME"
   - Note the 6-digit room code

2. **Device 2 (Guest):**
   - Open app
   - Select "Dice Rush"
   - Enter the 6-digit code
   - Tap "JOIN GAME"

3. **Both devices:**
   - Wait in lobby (3-second countdown)
   - Play through a few rounds
   - Verify:
     - Timer synchronization
     - Bet submission
     - Dice rolls
     - Score updates
     - Win conditions

#### Testing Edge

1. **Device 1 (Host):**
   - Open app
   - Select "Edge" from Game Picker
   - Tap "Create Room"
   - Enter your name (1-8 characters)
   - Share the room code

2. **Device 2 (Guest):**
   - Open app
   - Select "Edge"
   - Enter the 6-digit code
   - Tap "Join Room"
   - Enter your name

3. **Lobby:**
   - Both players appear in lobby
   - Host can kick players
   - Host starts game when ready

### Single Device Testing

Limited testing possible with web + mobile:

1. Run on web browser (host)
2. Run on mobile device (guest)
3. Join same room

**Note:** Some features may behave differently on web.

## Development Workflow

### Making Changes

```bash
# 1. Make code changes in your editor

# 2. Save files (auto-reload on Expo)

# 3. Test changes on device/simulator

# 4. Check console for errors
```

### Hot Reload

Expo supports hot reload:
- Save file → Changes appear automatically
- Fast Refresh preserves component state
- Full reload: Press 'r' in terminal

### Clear Cache

If experiencing issues:

```bash
# Clear Metro bundler cache
npx expo start -c

# Or clear all caches
npm start -- -c
```

### Linting

```bash
npm run lint
```

### Adding New Game

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed instructions on adding new games to the platform.

## Troubleshooting

### .env Not Loading

**Symptoms:** "Missing Supabase environment variables" error

**Solution:**
1. Verify `.env` exists in project root
2. Check variable names have `EXPO_PUBLIC_` prefix
3. Restart Expo server: `npx expo start -c`
4. Verify no typos in variable names

### Room Creation Fails

**Symptoms:** Error when tapping "HOST GAME"

**Solutions:**
1. Check Supabase credentials in `.env`
2. Verify Supabase project is active (not paused)
3. Check internet connection
4. Review console logs for specific error

### Players Can't Connect

**Symptoms:** Guest can't join host's room

**Solutions:**
1. Verify both devices use same Supabase project
2. Check room code entered correctly
3. Ensure both devices have internet connection
4. Verify Supabase Realtime is enabled:
   - Go to Supabase Dashboard
   - Project Settings → API → Realtime
   - Ensure "Enable Realtime" is ON

### Timer Desynchronization

**Symptoms:** Timers show different values on each device

**Solutions:**
1. Check network connection quality
2. Verify both devices running same code version
3. Timer sync uses Supabase Presence - check Presence is enabled
4. Some desync (<500ms) is normal due to network latency

### Build Errors

**Symptoms:** `npm install` or `npm start` fails

**Solutions:**

```bash
# Clear all caches and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Clear Metro cache
npx expo start -c
```

### Expo Go Issues

**Symptoms:** App won't load in Expo Go

**Solutions:**
1. Update Expo Go to latest version
2. Ensure device and computer on same network
3. Try scanning QR code again
4. Use tunnel mode: `npx expo start --tunnel`

### Missing Dependencies

**Symptoms:** "Module not found" errors

**Solution:**

```bash
# Install missing dependency
npm install <package-name>

# Example for expo-secure-store
npm install expo-secure-store
```

### Port Already in Use

**Symptoms:** "Port 8081 already in use"

**Solution:**

```bash
# Kill process on port 8081
npx kill-port 8081

# Or run on different port
npx expo start --port 8082
```

## Next Steps

After setup:

1. ✅ Test both games from Game Picker
2. ✅ Test multiplayer with 2 devices
3. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the codebase
4. ✅ Review game-specific docs:
   - [DOCS.md](./DOCS.md) - Dice Rush technical docs
   - [GAME_GUIDE.md](./GAME_GUIDE.md) - Gameplay guide

## Getting Help

If you encounter issues not covered here:

1. Check [DOCS.md](./DOCS.md) troubleshooting section
2. Review [Expo documentation](https://docs.expo.dev/)
3. Check [Supabase documentation](https://supabase.com/docs)
4. Open an issue on the repository

## Development Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Supabase Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

