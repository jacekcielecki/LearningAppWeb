import ilustrationUrl from '../../Assets/Images/Service Unavailable.png';
import Box from '@mui/material/Box/Box';

function Error() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', my: -12, mx: -12}}>
        <img src={ilustrationUrl} alt='' style={{display: 'flex', width: '40%', marginTop: 50}} />
    </Box>
  )
}

export default Error
