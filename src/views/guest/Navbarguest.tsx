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
   
    type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';

import { useDemoRouter } from '@toolpad/core/internal';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import GuestDashboard from './GuestDashboard';





const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'guestdashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
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
        case '/guestdashboard':
            return <GuestDashboard/>;
       
        default:
            return <GuestDashboard />;
    }
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

function NavbarGuest(props: DemoProps) {
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

export default NavbarGuest;
