import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import CookieConsentModal from '../Modals/CookieConsentModal';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import config from '../../config';

export default function Footer(){
  const [cookies] = useCookies(["cookiesConsent"]);
  const [isCookiesConsentModalVisible, setIsCookiesConsentModalVisible] = useState(false);

  const handleCookiesAccept = () => {
    setIsCookiesConsentModalVisible(false);
  }

  const handleCookiesReject = () => {
    setIsCookiesConsentModalVisible(false);
  }

  const showCookiesConsentModal = () => {
    setIsCookiesConsentModalVisible(true)
  }

  useEffect(() => {
    const consentNotSpecified = cookies.cookiesConsent !== true && cookies.cookiesConsent !== false;
    setIsCookiesConsentModalVisible(consentNotSpecified);
  }, [cookies.cookiesConsent]);
  
  return (
    <>
      <CookieConsentModal isOpen={isCookiesConsentModalVisible} onCookiesAccepted={handleCookiesAccept} onCookiesRejected={handleCookiesReject} />
      
      <footer style={{ marginTop: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px', borderTop: 'solid var(--lap-grey) 2px', backgroundColor: 'var(--lap-white)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 3 }}>
            <Typography variant="body1" noWrap component="div" style={{ marginRight: 16 }}>
              © LearningApp {new Date().getFullYear()}
            </Typography>
            |
            <Typography variant="body1" noWrap component="div" style={{ marginLeft: 16 }}>
              Version {config.version}
            </Typography>
          </Box>
          <Typography onClick={showCookiesConsentModal} variant="body1" noWrap component="div" sx={{ cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', height: '40px', borderTop: 'solid var(--lap-grey) 2px', backgroundColor: 'var(--lap-white)', paddingRight: 2 }}>
            <CookieOutlinedIcon sx={{ fontSize: 14, marginRight: 1 }} />
            Manage Cookies policy
          </Typography>
        </Box>
      </footer>
    </>
  );
};
