import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';

interface CookieConsentModalProps {
    isOpen: boolean;
    onCookiesAccepted: (...args: any[]) => any;
    onCookiesRejected: (...args: any[]) => any;
  }

const CookieConsentModal: React.FC<CookieConsentModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    useEffect(() => {
        setIsOpen(props.isOpen);
      }, [props.isOpen]);

      const handleDialogSubmit = (isRejected : boolean) => {
        if(isRejected){
            props.onCookiesRejected();
        }else{
            props.onCookiesAccepted();
        }
    }

    return (
        <>
            {isOpen ? (
                <Box className='cookies-info'>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h3>Cookies policy</h3>
                        </div>
                        <div>
                            <IconButton style={{color: 'black'}} onClick={() => handleDialogSubmit(true)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <span>
                        Our website uses cookies to enhance your user experience and store preferences. By accepting cookies, you agree to our use of
                        cookies. You can manage your cookie preferences at any time in your user menu.
                    </span>
                    <Box sx={{marginTop: 3, display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                        <Button variant="contained" color='secondary' size='medium' onClick={() => handleDialogSubmit(false)} sx={{marginRight: 1}}>
                            Accept
                        </Button>
                        <Button variant="contained" color='primary' size='medium' onClick={() => handleDialogSubmit(true)}>
                            Decline
                        </Button>
                    </Box>
                </Box>
            ) : 
        (<></>)}
        </>
    );
}

export default CookieConsentModal;
