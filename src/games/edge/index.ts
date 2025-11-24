import type { IGame } from '../types';
import EdgeHome from './screens/EdgeHome';
import EdgeGame from './screens/EdgeGame';
import { ImageSourcePropType } from 'react-native';

// TODO: Replace with actual Edge thumbnail image
const thumbnail: ImageSourcePropType = require('@/assets/images/icon.png');

export const edgeGame: IGame = {
  id: 'edge',
  name: 'Edge',
  thumbnail,
  minPlayers: 2,
  maxPlayers: 8,
  HomeScreen: EdgeHome,
  GameScreen: EdgeGame,
};

