import type { IGame } from './types';
import { diceRushGame } from './dice-rush';

export const GAMES: IGame[] = [diceRushGame];

export function pickRandomGame(): IGame | null {
  if (GAMES.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * GAMES.length);
  return GAMES[randomIndex];
}

export function getGameById(id: string): IGame | undefined {
  return GAMES.find((game) => game.id === id);
}

