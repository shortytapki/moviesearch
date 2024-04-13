import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserSchema, userActions, userReducer } from './userSlice';
import { loginByUsername } from '@features/authenticateUser';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

let state: UserSchema;

beforeEach(() => {
  state = {
    _initialized: false,
    username: '',
    isLoggingIn: false,
  };
});

describe('User slice sync actions tests', () => {
  test('Should initialize user from local storage', () => {
    state = userReducer(state, userActions.init());
    expect(state._initialized).toBeTruthy();
  });
  test('Should clear username', () => {
    state = userReducer(state, userActions.logout());
    expect(state.username).toEqual('');
  });
});

describe('User slice async actions tests', () => {
  test('Should set logging in state while pending', () => {
    const spy = vi.fn(loginByUsername.pending);
    const thunkResult = spy('', { username: 'username' });
    state = userReducer(state, { type: thunkResult.type });
    expect(state.isLoggingIn).toBeTruthy();
    expect(state.error).toBeUndefined();
  });

  test('Should set error if rejected', () => {
    const spy = vi.fn(loginByUsername.rejected);
    const thunkResult = spy(new Error('error'), '', { username: 'username' });
    state = userReducer(state, {
      type: thunkResult.type,
      payload: thunkResult.error.message,
    });
    expect(state.error).toEqual('error');
  });

  test('Should set username if successful', () => {
    const spy = vi.fn(loginByUsername.fulfilled);
    const thunkResult = spy(
      { username: 'username', password: 'password' },
      '',
      { username: 'username' },
    );
    state = userReducer(state, {
      type: thunkResult.type,
      payload: thunkResult.payload,
    } as PayloadAction<User>);
    expect(state.username).toEqual('username');
    expect(state.error).toBeUndefined();
  });
});
