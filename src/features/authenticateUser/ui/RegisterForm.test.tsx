import { renderComponent } from '@app/providers/test';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import { register } from '../api/authenticateUser';

describe('Login form render test', () => {
  beforeEach(() => {
    renderComponent(<RegisterForm />);
  });

  test('Should render login form', () => {
    expect(screen.getByTestId('register-form')).toBeTruthy();
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

  test('Should change confirm password input value on change', () => {
    const confirmPasswordInput = screen.getByTestId('confirm-password');
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'best-pasSWORD_inDAwrld' },
    });
    expect(confirmPasswordInput.getAttribute('value')).toEqual(
      'best-pasSWORD_inDAwrld',
    );
  });

  test('Should check the ability to submit', () => {
    const submitBtn = screen.getByTestId('submit');
    const confirmPasswordInput = screen.getByTestId('confirm-password');
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, {
      target: { value: 'best-pasSWORD_inDAwrld' },
    });
    expect(submitBtn.getAttribute('disabled')).toEqual('');
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'best-pasSWORD_inDAwrld' },
    });
    expect(submitBtn.getAttribute('disabled')).toBeFalsy();
  });
});
