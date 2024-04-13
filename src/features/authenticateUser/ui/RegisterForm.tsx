import { type FormEvent, useState } from 'react';
import { Button, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@app/providers/store';
import { selectUserError, selectIsLoggingIn } from '@entities/User';
import { register } from '../api/authenticateUser';

interface RegisterFormProps {
  className?: string;
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLoggingIn = useSelector(selectIsLoggingIn);
  const error = useSelector(selectUserError);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ username, password }));
  };

  return (
    <Form
      className={className}
      onSubmit={handleSubmit}
      data-testId="register-form"
    >
      <FormGroup>
        <FormControl
          data-testId="username"
          type="text"
          id="username"
          placeholder="Имя пользователя"
          name="username"
          className="mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isValid={username.length > 3}
        />
        {username.length < 3 && (
          <Form.Control.Feedback className="text-danger">
            Обязательное поле, имя пользователя должно быть длиной от 3 символов
          </Form.Control.Feedback>
        )}
      </FormGroup>
      <FormControl
        data-testId="password"
        type="password"
        placeholder="Пароль"
        name="password"
        className="mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoggingIn}
      />
      <FormControl
        data-testId="confirm-password"
        type="password"
        placeholder="Повторите пароль"
        name="confirmPassword"
        className="mb-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoggingIn}
      />
      <Button
        data-testId="submit"
        type="submit"
        disabled={isLoggingIn || confirmPassword !== password}
        className="mb-3"
      >
        Зарегистрироваться
      </Button>
      {isLoggingIn && <Spinner className="d-block" />}
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};
