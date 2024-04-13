import { BrowserRouter } from 'react-router-dom';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { type RenderOptions, render } from '@testing-library/react';
import { StoreProvider } from '../store';

const ProviderWrapper: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <StoreProvider>{children}</StoreProvider>
  </BrowserRouter>
);

export const customRender = (ui: ReactNode, options?: RenderOptions) =>
  render(ui, { wrapper: ProviderWrapper, ...options });
