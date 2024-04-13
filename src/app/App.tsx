import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MOVIE_SEARCH_QUERY_HISTORY } from '@shared/consts';
import { selectUserInitialized, userActions } from '@entities/User';
import { AppRouter } from './providers/router/AppRouter';
import { Layout } from './providers/layout/Layout';
import { useAppDispatch } from './providers/store';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const dispatch = useAppDispatch();
  const initialized = useSelector(selectUserInitialized);

  useEffect(() => {
    if (!localStorage.getItem(MOVIE_SEARCH_QUERY_HISTORY)) {
      localStorage.setItem(MOVIE_SEARCH_QUERY_HISTORY, JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    dispatch(userActions.init());
  }, [dispatch]);

  return (
    initialized && (
      <Layout>
        <AppRouter />
      </Layout>
    )
  );
};
