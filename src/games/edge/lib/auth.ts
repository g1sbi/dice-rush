import { supabase } from './supabase';

/**
 * Initialize anonymous authentication session
 * Called on app startup to ensure user is authenticated
 */
export async function initializeAuth(): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      throw new Error(`Failed to initialize anonymous auth: ${error.message}`);
    }
  }
}

/**
 * Get current user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id || null;
}

