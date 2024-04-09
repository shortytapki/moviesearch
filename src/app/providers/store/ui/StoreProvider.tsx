import { Provider } from 'react-redux';
import type { FC, PropsWithChildren } from 'react';
import { createMainStore } from '../config/store';
import { useNavigate } from 'react-router-dom';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={createMainStore(useNavigate())}>{children}</Provider>;
};
