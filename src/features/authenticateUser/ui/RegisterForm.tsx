import { type FormEvent, useState } from 'react';
import { Button, Form, FormControl, FormGroup, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@app/providers/store/config/store';
import { getError, getIsLoggingIn } from '@entities/User';
import { register } from '../api/authenticateUser';

interface RegisterFormProps {
  className?: string;
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLoggingIn = useSelector(getIsLoggingIn);
  const error = useSelector(getError);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ username, password }));
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl
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
        type="password"
        placeholder="Пароль"
        name="password"
        className="mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoggingIn}
      />
      <FormControl
        type="password"
        placeholder="Повторите пароль"
        name="confirmPassword"
        className="mb-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoggingIn}
      />
      <Button
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
