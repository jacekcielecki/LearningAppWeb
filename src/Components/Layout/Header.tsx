import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function Header() {

  let navigate = useNavigate(); 
  const navigateHome = () =>{ 
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{bgcolor: 'var(--lap-navy-blue-darken)'}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" onClick={navigateHome} sx={{cursor: 'pointer'}}>
            LearningApp
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}