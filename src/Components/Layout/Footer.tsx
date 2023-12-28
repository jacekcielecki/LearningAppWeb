import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer(){
    return(
        <footer>
            <Box sx={{ display: 'flex', bgcolor: 'var(--lap-grey)', height: '30px'}}>
                    <Typography variant="body1" noWrap component="div">
                    LearningApp 2023
                    </Typography>
            </Box>
        </footer>
    )
}