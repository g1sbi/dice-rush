import type { IGame } from './types';
import { diceRushGame } from './dice-rush';
import { edgeGame } from './edge';

export const GAMES: IGame[] = [diceRushGame, edgeGame];

export function pickRandomGame(): IGame | null {
  if (GAMES.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * GAMES.length);
  return GAMES[randomIndex];
}

export function getGameById(id: string): IGame | undefined {
  return GAMES.find((game) => game.id === id);
}

