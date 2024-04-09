import { AppRouter } from './providers/router/AppRouter';
import { Layout } from './providers/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { MOVIE_SEARCH_QUERY_HISTORY } from '@shared/consts/consts';
import { useAppDispatch } from './providers/store/config/store';
import { getUserInitialized, userActions } from '@entities/User';
import { useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useAppDispatch();
  const initialized = useSelector(getUserInitialized);

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
