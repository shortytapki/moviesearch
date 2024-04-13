import type { StateSchema } from '@app/providers/store';

export const selectUsername = (state: StateSchema) => state.user.username;
export const selectIsLoggingIn = (state: StateSchema) => state.user.isLoggingIn;
export const selectUserError = (state: StateSchema) => state.user.error;
export const selectUserInitialized = (state: StateSchema) =>
  state.user._initialized;
