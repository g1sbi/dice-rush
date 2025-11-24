/**
 * Shared matchmaking service
 * 
 * TODO: Implement shared matchmaking logic that works across all games
 * Currently, each game uses its own room manager, but this should be abstracted
 * to support multiple games with a unified matchmaking system.
 */

export interface MatchmakingOptions {
  gameId: string;
  minPlayers: number;
  maxPlayers: number;
}

export interface RoomInfo {
  roomCode: string;
  gameId: string;
  playerCount: number;
}

/**
 * Creates a room for a specific game
 * @param options - Matchmaking options
 * @returns Room information
 */
export async function createRoom(options: MatchmakingOptions): Promise<RoomInfo> {
  // TODO: Implement shared room creation
  throw new Error('Not implemented - use game-specific room manager for now');
}

/**
 * Joins a room by code
 * @param roomCode - The room code
 * @returns True if join was successful
 */
export async function joinRoom(roomCode: string): Promise<boolean> {
  // TODO: Implement shared room joining
  throw new Error('Not implemented - use game-specific room manager for now');
}

