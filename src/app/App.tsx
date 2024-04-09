import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './providers/router/AppRouter';
import { Layout } from './providers/layout/Layout';
import { StoreProvider } from './providers/store/ui/StoreProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { MOVIE_SEARCH_QUERY_HISTORY } from '@shared/consts/consts';

export const App = () => {
  useEffect(() => {
    if (!localStorage.getItem(MOVIE_SEARCH_QUERY_HISTORY)) {
      localStorage.setItem(MOVIE_SEARCH_QUERY_HISTORY, JSON.stringify([]));
    }
  }, []);
  return (
    <BrowserRouter>
      <StoreProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </StoreProvider>
    </BrowserRouter>
  );
};
