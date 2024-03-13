import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

const Answer = styled(Paper)(({}) => ({
  backgroundColor: '#fff',
  padding: '18px',
  textAlign: 'left',
  color: grey[800],
  overflow: 'hidden',
  border: '1px solid',
  borderColor: grey[300],
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '700',
  boxShadow: 'none'
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '120px'}}>
        <Box sx={{ width: '80%', maxWidth: '1400px', display: 'flex', padding: '12px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Answer>
                        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
                <Grid item xs={6}>
                    <Answer>
                        2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
                <Grid item xs={6}>
                    <Answer>
                        3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
                <Grid item xs={6}>
                    <Answer>
                        4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
            </Grid>
        </Box>
    </Box>

  );
}