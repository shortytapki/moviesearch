import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RoutePaths } from '@shared/config/routeConfig';
import { getUsername } from '@entities/User';
import { LoginForm } from '../../features/authenticateUser/ui/LoginForm';

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
