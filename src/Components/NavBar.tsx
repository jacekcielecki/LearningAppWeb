import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
        bgcolor: '#34495E'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            LearningApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"

      >
        <Toolbar />
        <Divider />
        <List>
            {['Learn', 'Quick Start', 'Leaderboard', 'Profile', 'Admin Panel']
            .map((text, index) => {
                let icon;
                switch (text) {
                case 'Learn':
                    icon = <SchoolIcon />;
                    break;
                case 'Quick Start':
                    icon = <PlayCircleFilledIcon />;
                    break;
                case 'Leaderboard':
                    icon = <LeaderboardIcon />;
                    break;
                case 'Profile':
                    icon = <AccountBoxIcon />;
                    break;
                case 'Profile':
                    icon = <AccountBoxIcon />;
                    break;
                case 'AdminPanelSettingsIcon':
                    icon = <AdminPanelSettingsIcon />;
                    break;
                default:
                    icon = <AdminPanelSettingsIcon />;
                    break;
                }
                return (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                );
            })}
        </List>


      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}