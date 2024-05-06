// components/Layout.tsx
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div>
    <header>
     
    </header>
    <main>
      {children}
    </main>
    <footer>
 
    </footer>
  </div>
);

export default Layout;