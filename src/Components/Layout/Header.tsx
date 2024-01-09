import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserMenu from './UserMenu';
import UserAvatar from './UserAvatar';
import UserContext from '../../Contexts/UserContext';

export default function Header() {
  let navigate = useNavigate(); 
  const user = useContext(UserContext);

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
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="body1" noWrap component="div" sx={{cursor: 'pointer'}}>
              {user?.emailAddress}
            </Typography>
            <UserAvatar/>
            <UserMenu/>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}