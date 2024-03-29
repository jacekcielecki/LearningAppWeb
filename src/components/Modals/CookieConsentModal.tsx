import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import { useCookies } from "react-cookie";

interface CookieConsentModalProps {
    isOpen: boolean;
    onCookiesAccepted: (...args: any[]) => any;
    onCookiesRejected: (...args: any[]) => any;
  }

const CookieConsentModal: React.FC<CookieConsentModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [cookiesConsent, setCookiesConsent] = useCookies(["cookiesConsent"]);

    useEffect(() => {
        setIsOpen(props.isOpen);
      }, [props.isOpen, cookiesConsent]);

    const handleDialogSubmit = (isRejected : boolean) => {
        if(isRejected){
            setCookiesConsent("cookiesConsent", "false", { path: "/" });
            props.onCookiesRejected();
        }else{
            setCookiesConsent("cookiesConsent", "true", { path: "/" });
            props.onCookiesAccepted();
        }
    }

    return (
        <>
            {(isOpen) ? (
                <Paper elevation={2} className='cookies-info'>
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
                        cookies. You can manage your cookie preferences at any time by clicking "Manage Cookies Policy" at the bottom of of any page.
                    </span>
                    <Box sx={{marginTop: 3, display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                        <Button disableElevation variant="contained" color='secondary' size='medium' onClick={() => handleDialogSubmit(true)} sx={{marginRight: 2}}>
                            Decline
                        </Button>
                        <Button disableElevation variant="contained" color='primary' size='medium' onClick={() => handleDialogSubmit(false)}>
                            Accept
                        </Button>
                    </Box>
                </Paper>
            ) : 
        (<></>)}
        </>
    );
}

export default CookieConsentModal;
