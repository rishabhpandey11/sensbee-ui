import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider, type Navigation, Router } from '@toolpad/core/AppProvider';
import {
    DashboardLayout,
    ThemeSwitcher,
    type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SensorsIcon from '@mui/icons-material/Sensors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useDemoRouter } from '@toolpad/core/internal';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Charts from '../../pages/Charts';
import AdminDashboard from './AdminDashboard';
import Addsensor from '../../pages/Sensor/Addsensor';
import Userlistpage from '../../pages/User/Userlistpage';
import Sensorslistpage from '../../pages/Sensor/Sensorslistpage';
import  {useNavigate}  from 'react-router-dom';
import Adduser from '../../pages/User/Adduser';
import authStore from '../../service/services/authStore.service'
import CabinOutlinedIcon from '@mui/icons-material/CabinOutlined';






const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'admindashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'user',
        title: 'Users',
        icon: <PeopleAltIcon />,
        children: [
            {
                segment: 'add',
                title: 'Add User',
                icon: <PersonAddIcon />,
            },
            {
                segment: 'list',
                title: 'List',
                icon: <ChecklistIcon />,
            },
        ],
    },
    {
        segment: 'sensor',
        title: 'Sensor',
        icon: <SensorsIcon />,
        children: [
            {
                segment: 'add',
                title: 'Register',
                icon: <AddCircleOutlineIcon />,
            },
            {
                segment: 'list',
                title: 'List',
                icon: <ChecklistIcon />,
            },
         
        ],
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'charts',
        title: 'Charts',
        icon: <BarChartIcon />,
    },
   
];

const demoTheme = createTheme({

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    switch (pathname) {
        case '/admindashboard':
            return <AdminDashboard />;
        case '/user/add':
            return <Adduser/>;
        case '/user/list':
            return <Userlistpage />;
        case '/sensor/add':
            return <Addsensor/>;
        case '/sensor/list':
            return <Sensorslistpage />;
        case '/charts':
            return <Charts />;
         
      
          
       
        default:
            return <AdminDashboard />;
    }
}



function ToolbarActionsSearch() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const logout = authStore((state) => state.logout); // Get logout function from Zustand

    const handleLogout = async () => {
        await logout(); // Call Zustand logout function
     
    };

    return (
        <Stack direction="row">
             <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>(navigate('/'))}
                    color="inherit"
                >
                    <CabinOutlinedIcon />
                </IconButton>


            <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem  onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    
                </Menu>
            </div>
           

        </Stack>
    );
}

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© UI' : `© ${new Date().getFullYear()} Sensbee`}
        </Typography>
    );
}

function CustomAppTitle() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <LocationCityIcon fontSize="large" color="primary" />
            <Typography variant="h6">Sensbee</Typography>

        </Stack>
    );
}

interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

function NavbarAdmin(props: DemoProps) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');



    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsSearch,
                    sidebarFooter: SidebarFooter,
                }}
            >


                <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: '#f3f4f7' }}>
                    <DemoPageContent pathname={router.pathname} />


                </Box>


            </DashboardLayout>
        </AppProvider>
    );
}

export default NavbarAdmin;
