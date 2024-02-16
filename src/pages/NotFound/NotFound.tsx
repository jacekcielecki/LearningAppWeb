import ilustrationUrl from '../../assets/images/Not Found.png';
import Box from '@mui/material/Box/Box';

function NotFound() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', my: -12, mx: -12}}>
        <img src={ilustrationUrl} alt='' style={{display: 'flex', width: '50%'}} />
    </Box>
  )
}

export default NotFound
