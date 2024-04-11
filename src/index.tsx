import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@app/App';
import { StoreProvider } from '@app/providers/store';

const root = document.getElementById('root') as HTMLDivElement;
createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
