import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer(){
  return (
    <footer>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '40px', borderTop: 'solid var(--lap-grey) 2px', backgroundColor: 'var(--lap-white)' }}>
        <Typography variant="body1" noWrap component="div" style={{ paddingLeft: 20 }}>
          © LearningApp {new Date().getFullYear()}
        </Typography>
      </Box>
    </footer>
  );
};
