import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    handleClose();
    logout();
  };
  const logout= () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <div>
      <IconButton aria-label="more" id="long-button" aria-controls={open ? 'long-menu' : undefined} 
        aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}>
            {open ? <KeyboardArrowUpIcon sx={{ color: 'white' }} /> : <KeyboardArrowDownIcon sx={{ color: 'white' }} /> } 
      </IconButton>
      <Menu id="long-menu" MenuListProps={{'aria-labelledby': 'long-button',}} anchorEl={anchorEl} open={open} onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem key={'log out'} onClick={handleLogoutClick}>
            <LogoutIcon fontSize='small' />
            <div style={{marginLeft: 9}}>Logout</div>
          </MenuItem>
      </Menu>
    </div>
  );
}