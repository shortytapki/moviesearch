import { Provider } from 'react-redux';
import type { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMainStore } from '../config/store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={createMainStore(useNavigate())}>{children}</Provider>;
};
