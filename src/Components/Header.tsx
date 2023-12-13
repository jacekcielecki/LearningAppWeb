import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{bgcolor: 'var(--lap-navy-blue-darken)'}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            LearningApp
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}