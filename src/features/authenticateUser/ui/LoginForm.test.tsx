import { renderComponent } from '@app/providers/test';
import { beforeEach, describe, expect, test } from 'vitest';
import { LoginForm } from './LoginForm';
import { fireEvent, screen } from '@testing-library/react';

describe('Login form render test', () => {
  beforeEach(() => {
    renderComponent(<LoginForm />);
  });

  test('Should render login form', () => {
    expect(screen.getByTestId('login-form')).toBeTruthy();
  });

  test('Should change username input value on change', () => {
    const usernameInput = screen.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'shortytapki' } });
    expect(usernameInput.getAttribute('value')).toEqual('shortytapki');
  });

  test('Should change password input value on change', () => {
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, {
      target: { value: 'best-pasSWORD_inDAwrld' },
    });
    expect(passwordInput.getAttribute('value')).toEqual(
      'best-pasSWORD_inDAwrld',
    );
  });
});
