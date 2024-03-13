import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import grey from "@mui/material/colors/grey";

const Answer = styled(Box)(() => ({
    m: 1,
    p: 1,
    bgcolor: '#fff',
    color: grey[800],
    border: '1px solid',
    borderColor: grey[300],
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '700',
    margin: '8px',
    padding: '8px',
    width: '500px'
}));

const Quiz = () => {
    return ( 
        <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <div className='quiz-content'>
                <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                        <Answer>
                            {"1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"}
                        </Answer>                   
                    </Grid>
                    <Grid item xs={6}>
                        <Answer>
                            {"2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"}
                        </Answer>
                    </Grid>
                </Grid>
            </div>
        </Box> 
    );
}
 
export default Quiz;