import React, { ReactNode } from 'react';
import Header from './Header';
import Box from '@mui/material/Box/Box';
import Footer from './Footer';

const Layout: React.FC<{ children: ReactNode }> = ({children}) =>{
    return(
        <>
            <Header/>
            <main>
                <Box sx={{ my: 16, mx: 12, minHeight: '58vh'}}> 
                    {children}
                </Box>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;