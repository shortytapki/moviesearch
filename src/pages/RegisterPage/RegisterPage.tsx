import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUsername } from '@entities/User';
import { RegisterForm } from '@features/authenticateUser';
import { RoutePaths } from '@shared/config/routeConfig';

export default function RegisterPage() {
  const username = useSelector(selectUsername);
  const navigate = useNavigate();

  useEffect(() => {
    username && navigate(RoutePaths.main);
  }, [username]);

  return (
    <Container>
      <p>
        Есть аккаунт? <Link to={RoutePaths.login}>Войти</Link>
      </p>
      <RegisterForm />
    </Container>
  );
}
