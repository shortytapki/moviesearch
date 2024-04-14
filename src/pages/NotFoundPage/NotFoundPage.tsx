import { Link } from 'react-router-dom';
import { RoutePaths } from '@shared/config';

export default function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <p>Запрашиваемая страница не найдена...</p>
      <Link to={RoutePaths.main}>Вернуться на главную</Link>
    </>
  );
}
