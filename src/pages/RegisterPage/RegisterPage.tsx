import { getUsername } from '@entities/User';
import { RegisterForm } from '@features/authenticateUser/ui/RegisterForm';
import { RoutePaths } from '@shared/config/routeConfig';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const username = useSelector(getUsername);
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
