import { useAppDispatch } from '@app/providers/store/config/store';
import { type FormEvent, useState } from 'react';
import { Button, FormControl, Spinner } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { loginByUsername } from '../api/authenticateUser';
import { useSelector } from 'react-redux';
import { getError, getIsLoggingIn } from '@entities/User';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isLoggingIn = useSelector(getIsLoggingIn);
  const error = useSelector(getError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginByUsername({ username, password }));
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Имя пользователя"
        name="username"
        className="mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={isLoggingIn}
      />
      <FormControl
        type="password"
        placeholder="Пароль"
        name="password"
        className="mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoggingIn}
      />
      <Button className="mb-3" type="submit" disabled={isLoggingIn}>
        Войти
      </Button>
      {isLoggingIn && <Spinner className="d-block" />}
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};
