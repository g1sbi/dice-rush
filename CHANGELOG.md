# Changelog

## v0.18.0 - Multi-Game Architecture (2025)

### Major Changes

#### Multi-Game Platform

- Converted single-game app into multi-game platform
- Added modular architecture supporting multiple independent games
- Implemented IGame interface for game plugin system
- Created Game Registry for managing available games
- Added Game Picker screen for game selection

#### New Game: Edge

- Integrated Edge game into the platform
- 1-button multiplayer chicken game
- Room-based multiplayer (2-8 players)
- Lobby system with room codes
- Hold-and-release gameplay mechanics

#### Architecture Updates

- Restructured project to `src/games/[game-name]/` pattern
- Each game is self-contained with its own:
  - Components
  - Screens
  - Services
  - State management
  - Types
- Dynamic routing via `/[gameId]` for game selection
- Shared utilities in `src/shared/`

#### Dependencies

- Added `expo-secure-store` for Edge game authentication

### Documentation

#### New Documents

- **ARCHITECTURE.md** - Multi-game architecture guide
  - IGame interface specification
  - Game registration system
  - How to add new games
  - Best practices

- **SETUP.md** - Comprehensive setup guide
  - Installation instructions
  - Supabase configuration
  - Multi-device testing
  - Troubleshooting

#### Updated Documents

- **README.md** - Updated for multi-game platform
  - Multi-game overview
  - Game selection workflow
  - Updated project structure
  - Links to new documentation

- **DOCS.md** - Added multi-game sections
  - Platform architecture
  - Game registry documentation
  - Navigation flow
  - Game-specific systems

### Project Structure

```
New structure:
src/games/
├── types.ts              # IGame interface
├── registry.ts           # Game registry
├── dice-rush/            # Dice Rush game
└── edge/                 # Edge game

app/
├── game-picker.tsx       # Game selection
└── [gameId]/             # Dynamic game routes
    ├── index.tsx
    └── game.tsx
```

### Migration Notes

- Dice Rush maintains full backward compatibility
- Edge integrated as separate game module
- Both games use shared Supabase credentials by default
- Games can be configured to use separate Supabase projects if needed

### Developer Experience

- Games can be developed independently
- Clear boundaries between game code
- Easy to add new games (see ARCHITECTURE.md)
- Hot reload works per-game
- Type-safe game registration

### Breaking Changes

None - Existing Dice Rush functionality unchanged

### Future Enhancements

- Game-specific settings menu
- Cross-game leaderboards
- Shared authentication system
- Tournament mode
- Custom game thumbnails

