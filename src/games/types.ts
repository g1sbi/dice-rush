import type { ImageSourcePropType } from 'react-native';

export interface IGame {
  id: string;
  name: string;
  thumbnail: ImageSourcePropType;
  minPlayers: number;
  maxPlayers: number;
  HomeScreen: React.ComponentType;
  GameScreen: React.ComponentType;
}

