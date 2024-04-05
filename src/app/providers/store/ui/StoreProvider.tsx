import { Provider } from 'react-redux';
import type { FC, PropsWithChildren } from 'react';
import { store } from '../config/store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
