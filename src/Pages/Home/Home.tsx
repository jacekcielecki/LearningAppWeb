import Grid from '@mui/material/Grid';
import ilustrationUrl from '../../Images/home-ilustration.jpg';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Home = () => {
    return (
        <> 
            <Grid container spacing={2} sx={{width: 'fit-content', alignItems: 'center'}}>
                <Grid item xs={6}>
                    <Box sx={{textAlign: 'left'}}>
                        <h3 style={{marginBottom: -20}}>Welcome to</h3>
                        <h1 style={{fontSize: 70, margin: 0}}>LearningApp</h1>
                        <p style={{fontSize: 16}}>
                            Learning has never been easier. Learn in just 5 minutes a day with game-like lessons,
                            or join other course creators and create your own learning course tailored for any subject of your choosing.
                        </p>
                        <div>
                            <Button variant="contained" disableElevation href="/login" sx={{mr: 3, backgroundColor: 'var(--lap-orange)'}}>Login</Button>
                            <Button variant="contained" disableElevation href="/login" sx={{backgroundColor: 'var(--lap-navy-blue)'}}>Register</Button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                    <div>
                        <img src={ilustrationUrl} className='home-ilustration' alt='image'></img>
                    </div>
                </Grid>
            </Grid>
        </>
     );
}