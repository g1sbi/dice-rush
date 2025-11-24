import type { IGame } from '../types';
import DiceRushHome from './screens/DiceRushHome';
import DiceRushGame from './screens/DiceRushGame';
import { ImageSourcePropType } from 'react-native';

// TODO: Replace with actual thumbnail image
const thumbnail: ImageSourcePropType = require('@/assets/images/icon.png');

export const diceRushGame: IGame = {
  id: 'dice-rush',
  name: 'Dice Rush',
  thumbnail,
  minPlayers: 2,
  maxPlayers: 2,
  HomeScreen: DiceRushHome,
  GameScreen: DiceRushGame,
};

