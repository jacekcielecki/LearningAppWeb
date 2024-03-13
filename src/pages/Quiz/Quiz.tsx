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
  fontWeight: '400',
  boxShadow: 'none'
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
        <Box sx={{ width: '80%', maxWidth: '1400px', display: 'flex', padding: '12px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid item xs={12}>
                    <h2>Select the correct answer</h2> 
                </Grid>

                <Grid item xs={6}>
                    <Answer>
                        <b>1. </b>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
                <Grid item xs={6}>
                    <Answer>
                        <b>2. </b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
                <Grid item xs={6}>
                    <Answer>
                        <b>3. </b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
                <Grid item xs={6}>
                    <Answer>
                        <b>4. </b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    </Answer>
                </Grid>
            </Grid>
        </Box>
    </Box>

  );
}