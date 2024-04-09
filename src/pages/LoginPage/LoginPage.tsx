import { Container } from 'react-bootstrap';
import { LoginForm } from '../../features/authenticateUser/ui/LoginForm';
import { Link } from 'react-router-dom';
import { RoutePaths } from '@shared/config/routeConfig';

export default function LoginPage() {
  return (
    <Container>
      <p>
        Нет аккаунта? <Link to={RoutePaths.register}>Зарегистрируйтесь!</Link>
      </p>
      <LoginForm />
    </Container>
  );
}
