import React, { ReactNode } from 'react';
import Header from './Header';
import Box from '@mui/material/Box/Box';
import Footer from './Footer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Box sx={{ my: 12, mx: 12 }}>{children}</Box>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
