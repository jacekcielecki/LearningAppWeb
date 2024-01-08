import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../App';

export default function Header() {
  let navigate = useNavigate(); 
  const userEmail = useContext(UserContext);

  const navigateHome = () =>{ 
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{bgcolor: 'var(--lap-navy-blue-darken)'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" onClick={navigateHome} sx={{cursor: 'pointer', marginRight: '5'}}>
            LearningApp
          </Typography>
          <Typography variant="body1" noWrap component="div" onClick={navigateHome} sx={{cursor: 'pointer'}}>
            {userEmail}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}