import type { FC, PropsWithChildren } from 'react';
import { Header } from '@widgets/Header/Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-5" data-testId="main">
        {children}
      </main>
    </>
  );
};
