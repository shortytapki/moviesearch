import { describe, expect, test } from 'vitest';
import {
  selectIsLoggingIn,
  selectUserError,
  selectUserInitialized,
  selectUsername,
} from './userSelectors';
import { StateSchema } from '@app/providers/store';

describe('User selectors tests', () => {
  const state = {
    user: {
      _initialized: true,
      username: 'username',
      isLoggingIn: false,
    },
  } as StateSchema;

  test('Should select _initialized', () => {
    expect(selectUserInitialized(state)).toBeTruthy();
  });
  test('Should select isLoggingIn', () => {
    expect(selectIsLoggingIn(state)).toBeFalsy();
  });
  test('Should select username', () => {
    expect(selectUsername(state)).toEqual('username');
  });
  test('Should select error', () => {
    expect(selectUserError(state)).toBeUndefined();
  });
});
