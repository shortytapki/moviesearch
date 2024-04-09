import { RegisterForm } from '@features/authenticateUser/ui/RegisterForm';
import { RoutePaths } from '@shared/config/routeConfig';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <Container>
      <p>
        Есть аккаунт? <Link to={RoutePaths.login}>Войти</Link>
      </p>
      <RegisterForm />
    </Container>
  );
}
