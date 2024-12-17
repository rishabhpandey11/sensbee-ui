import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import useAppStore from '../appStore';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle } from "react-icons/fa"; // Example using react-icons

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

function Navbar() {
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
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              sx={{ color: 'black', ml: 2 }} 
              onClick={handleLoginLogout}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>

            <Dropdown>
              <Dropdown.Toggle as="div" id="dropdown-icon" style={{ cursor: "pointer" }}>
                {/* User Profile Icon */}
                <FaUserCircle size={30} color="#1b9e3e" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
               
               
              </Dropdown.Menu>
            </Dropdown>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
