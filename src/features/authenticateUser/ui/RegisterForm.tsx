import { type FormEvent, useState } from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

interface RegisterFormProps {
  className?: string;
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <Form
      className={className}
      onSubmit={handleSubmit}
      validated={username.length > 3 && password.length > 6}
    >
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
        // required
      />
      <FormControl
        type="password"
        placeholder="Повторите пароль"
        name="confirmPassword"
        className="mb-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        // required
      />
      <Button type="submit">Зарегистрироваться</Button>
    </Form>
  );
};
