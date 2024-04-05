import { Header } from '@widgets/Header/Header';
import type { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-5">{children}</main>
    </>
  );
};
