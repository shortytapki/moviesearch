import type { StateSchema } from '@app/providers/store';

export const getUsername = (state: StateSchema) => state.user.username;
export const getIsLoggingIn = (state: StateSchema) => state.user.isLoggingIn;
export const getError = (state: StateSchema) => state.user.error;
export const getUserInitialized = (state: StateSchema) =>
  state.user._initialized;
