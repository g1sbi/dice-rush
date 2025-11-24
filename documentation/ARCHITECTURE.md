# Multi-Game Architecture

## Overview

This project uses a modular multi-game architecture that allows multiple games to coexist within a single React Native application. Each game is self-contained and pluggable.

## Core Concepts

### 1. IGame Interface

All games must implement the `IGame` interface defined in `src/games/types.ts`:

```typescript
export interface IGame {
  id: string;                    // Unique identifier (e.g., 'dice-rush', 'edge')
  name: string;                  // Display name
  thumbnail: ImageSourcePropType; // Game thumbnail image
  minPlayers: number;            // Minimum players required
  maxPlayers: number;            // Maximum players allowed
  HomeScreen: React.ComponentType; // Room creation/joining screen
  GameScreen: React.ComponentType; // Gameplay screen
}
```

### 2. Game Registry

The `src/games/registry.ts` file maintains the list of all available games:

```typescript
import { diceRushGame } from './dice-rush';
import { edgeGame } from './edge';

export const GAMES: IGame[] = [diceRushGame, edgeGame];

export function getGameById(id: string): IGame | undefined {
  return GAMES.find((game) => game.id === id);
}
```

### 3. Navigation Flow

```
App Launch
    ↓
Game Picker Screen
    ↓
User selects game
    ↓
/[gameId] (e.g., /dice-rush or /edge)
    ↓
Game's HomeScreen (room creation/joining)
    ↓
/[gameId]/game
    ↓
Game's GameScreen (actual gameplay)
```

### 4. Dynamic Routing

The app uses Expo Router's dynamic routes:

- `/[gameId]/index.tsx` - Renders the game's HomeScreen
- `/[gameId]/game.tsx` - Renders the game's GameScreen

Both wrappers fetch the game from the registry and render the appropriate component.

## Game Structure

Each game follows this folder structure:

```
src/games/[game-name]/
├── index.ts              # IGame export
├── screens/
│   ├── [Game]Home.tsx   # Room creation/joining
│   └── [Game]Game.tsx   # Gameplay
├── components/          # Game-specific components
├── lib/                 # Game logic and utilities
├── services/           # API services
├── types/              # TypeScript types
├── constants/          # Game constants
└── assets/             # Game-specific assets
```

## Adding a New Game

### Step 1: Create Game Folder

```bash
mkdir src/games/my-game
```

### Step 2: Implement Core Files

**src/games/my-game/index.ts**

```typescript
import type { IGame } from '../types';
import MyGameHome from './screens/MyGameHome';
import MyGameScreen from './screens/MyGameScreen';

export const myGame: IGame = {
  id: 'my-game',
  name: 'My Game',
  thumbnail: require('./assets/thumbnail.png'),
  minPlayers: 2,
  maxPlayers: 4,
  HomeScreen: MyGameHome,
  GameScreen: MyGameScreen,
};
```

**src/games/my-game/screens/MyGameHome.tsx**

```typescript
import { useRouter } from 'expo-router';

export default function MyGameHome() {
  const router = useRouter();
  
  const handleStartGame = () => {
    // Navigate to game screen
    router.push('/my-game/game');
  };
  
  return (
    // Your room creation/joining UI
  );
}
```

**src/games/my-game/screens/MyGameScreen.tsx**

```typescript
export default function MyGameScreen() {
  return (
    // Your gameplay UI
  );
}
```

### Step 3: Register Game

Add to `src/games/registry.ts`:

```typescript
import { myGame } from './my-game';

export const GAMES: IGame[] = [diceRushGame, edgeGame, myGame];
```

### Step 4: Add Dependencies

If your game needs specific dependencies:

```bash
npm install [your-dependencies]
```

## Game Independence

### Separate Concerns

- Each game manages its own state
- Each game can use its own Supabase project or share credentials
- Games don't interact with each other
- Games can use different libraries and patterns

### Shared Infrastructure

Games can leverage shared utilities from `src/shared/`:

- **Components**: `Background`, `ThemeMenu`, etc.
- **Services**: Matchmaking, common utilities
- **Theme**: Theme context and colors

## Examples

### Dice Rush

- **Architecture**: Host-guest pattern
- **State**: Zustand store
- **Backend**: Supabase Realtime
- **Features**: Dice betting, timer synchronization, bonus system

### Edge

- **Architecture**: Room-based multiplayer
- **State**: React hooks
- **Backend**: Supabase Realtime
- **Features**: Lobby system, room codes, hold-and-release gameplay

## Best Practices

### 1. Self-Contained Games

- Keep all game logic within the game's folder
- Don't depend on other games' code
- Use relative imports within your game

### 2. Clear Boundaries

- HomeScreen: Room management only
- GameScreen: Gameplay only
- Separate concerns between UI and logic

### 3. Consistent Navigation

- Use `useRouter` from `expo-router`
- Navigate using `/[gameId]/game` pattern
- Handle navigation errors gracefully

### 4. Asset Management

- Store game-specific assets in `src/games/[game]/assets/`
- Use `require()` for image imports
- Provide a thumbnail for the game picker

### 5. Environment Variables

- Share `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` by default
- Games can use separate Supabase projects if needed
- Document any additional environment variables

## Technical Details

### Path Aliases

The project uses TypeScript path aliases:

```typescript
{
  "@/*": ["./*"],
  "@games/*": ["./src/games/*"],
  "@shared/*": ["./src/shared/*"],
  "@app/*": ["./src/app/*"]
}
```

### Game Isolation

Each game:
- Has its own TypeScript types
- Manages its own dependencies
- Controls its own routing within `/[gameId]/*`
- Can be developed independently

### Testing

Test each game independently:

1. Navigate to the game from Game Picker
2. Create/join rooms
3. Play through gameplay
4. Test edge cases

## Future Enhancements

- Settings menu for each game
- Cross-game leaderboards
- Shared authentication system
- Game statistics and history
- Tournament mode
- Custom game configurations

## Troubleshooting

### Game Not Appearing

- Verify game is registered in `registry.ts`
- Check IGame export in game's `index.ts`
- Ensure thumbnail image exists

### Navigation Issues

- Use correct game ID in routes
- Check router paths match expected pattern
- Verify HomeScreen and GameScreen exports

### Shared Dependencies

- Install dependencies at root level
- Use `npm install` not `npm install --save`
- Check package.json includes all dependencies

