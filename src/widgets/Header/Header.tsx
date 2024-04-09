import { RoutePaths } from '@shared/config/routeConfig';
import { MOVIE_SEARCH_USER } from '@shared/consts/consts';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem(MOVIE_SEARCH_USER),
  );
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={RoutePaths.main}>MovieSearch</Navbar.Brand>
        {username && <Navbar.Text>Добро пожаловать, {username}</Navbar.Text>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={RoutePaths.main}>Главная</Nav.Link>
            {username ? (
              <Button
                onClick={() => {
                  setUsername(username);
                  localStorage.removeItem(MOVIE_SEARCH_USER);
                  navigate(RoutePaths.main);
                }}
              >
                Выйти
              </Button>
            ) : (
              <Nav.Link href={RoutePaths.login}>Войти</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
