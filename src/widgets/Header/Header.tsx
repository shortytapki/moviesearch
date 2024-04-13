import { useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/providers/store';
import { selectUsername, userActions } from '@entities/User';
import { RoutePaths } from '@shared/config/routeConfig';
import { MOVIE_SEARCH_USER } from '@shared/consts';

export const Header = () => {
  const navigate = useNavigate();
  const username = useSelector(selectUsername);
  const dispatch = useAppDispatch();
  const onLogOut = useCallback(() => {
    localStorage.removeItem(MOVIE_SEARCH_USER);
    dispatch(userActions.logout());
    navigate(RoutePaths.main);
  }, [dispatch]);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      data-testId="layout-header"
    >
      <Container>
        <Navbar.Brand href={RoutePaths.main}>MovieSearch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {username && (
            <Navbar.Text>
              Добро пожаловать, {username.replaceAll('"', '')}!
            </Navbar.Text>
          )}
          <Nav className="me-auto">
            <Nav.Link href={RoutePaths.main}>Главная</Nav.Link>

            {username ? (
              <>
                <Nav.Link href={RoutePaths.randomMovie}>
                  Найти случайный тайтл
                </Nav.Link>
                <Nav.Link onClick={onLogOut}>Выйти</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href={RoutePaths.login}>Войти</Nav.Link>
                <Nav.Link href={RoutePaths.register}>
                  Зарегистрироваться
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
