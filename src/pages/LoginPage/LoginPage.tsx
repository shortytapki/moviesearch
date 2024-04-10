import { Container } from 'react-bootstrap';
import { LoginForm } from '../../features/authenticateUser/ui/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '@shared/config/routeConfig';
import { useSelector } from 'react-redux';
import { getUsername } from '@entities/User';
import { useEffect } from 'react';

export default function LoginPage() {
  const username = useSelector(getUsername);
  const navigate = useNavigate();

  useEffect(() => {
    username && navigate(RoutePaths.main);
  }, [username]);

  return (
    <Container>
      <p>
        Нет аккаунта? <Link to={RoutePaths.register}>Зарегистрируйтесь!</Link>
      </p>
      <LoginForm />
    </Container>
  );
}
