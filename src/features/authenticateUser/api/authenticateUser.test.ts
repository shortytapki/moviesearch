import { describe, expect, test, vi } from 'vitest';
import { loginByUsername, register } from './authenticateUser';

describe('User login thunk test', () => {
  test('loginByUsername/fullfilled: should return user data', () => {
    const spy = vi.fn(loginByUsername.fulfilled);
    const result = spy(
      { username: 'username', password: 'password' },
      'feature/loginByUsername/fullfilled',
      {
        username: 'username',
      },
    );
    expect(spy).toHaveBeenCalled();
    expect(result.payload.username).toEqual('username');
  });

  test('loginByUsername/fullfilled: should set loading state with no payload', () => {
    const spy = vi.fn(loginByUsername.pending);
    const result = spy('', { username: 'username', password: 'password' });
    expect(spy).toHaveBeenCalled();
    expect(result.payload).toBe(undefined);
  });

  test('loginByUsername/rejected: should set loading state with no payload', () => {
    const spy = vi.fn(loginByUsername.rejected);
    const result = spy(new Error('error'), '', { username: 'username' });
    expect(spy).toHaveBeenCalled();
    expect(result.error.message).toBe('error');
  });
});

describe('User register thunk test', () => {
  test('register/fullfilled: should return user data', () => {
    const spy = vi.fn(register.fulfilled);
    const result = spy(
      { username: 'username', password: 'password' },
      'feature/register/fullfilled',
      {
        username: 'username',
      },
    );
    expect(spy).toHaveBeenCalled();
    expect(result.payload.username).toEqual('username');
  });

  test('register/fullfilled: should set loading state with no payload', () => {
    const spy = vi.fn(register.pending);
    const result = spy('', { username: 'username', password: 'password' });
    expect(spy).toHaveBeenCalled();
    expect(result.payload).toBe(undefined);
  });

  test('register/rejected: should set loading state with no payload', () => {
    const spy = vi.fn(register.rejected);
    const result = spy(new Error('error'), '', { username: 'username' });
    expect(spy).toHaveBeenCalled();
    expect(result.error.message).toBe('error');
  });
});
