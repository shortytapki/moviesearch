import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './providers/router/AppRouter';
import { Layout } from './providers/layout/Layout';
import { StoreProvider } from './providers/store/ui/StoreProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
};
