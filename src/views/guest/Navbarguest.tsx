import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import useAppStore from '../../appStore';
import { useNavigate, Link } from 'react-router-dom';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

function Navbarguest() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAppStore(); // Access Zustand store

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      logout();
      navigate('/logout');
    } else {
      login();
      navigate('/login'); // Navigate to login page
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'white', 
          color: 'black', 
          borderBottom: `2px solid #e0e0e0`, 
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Smart City UI
          </Typography>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbarguest;
