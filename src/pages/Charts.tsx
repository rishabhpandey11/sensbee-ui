import React from 'react';
import Sidenav from '../views/admin/Sidenavadmin';
import Navbar from '../components/Navbar';
import Admintop from '../views/admin/Admintop';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import '../Dash.css';
import Linechart from '../components/Charts/Linechart';
import Areabump from '../components/Charts/Areabump';
import Barchart from '../components/Charts/Barchart';
import Scatterplot from '../components/Charts/Scatterplot';
import Footer from '../components/Footer';

const Charts = () => {
    return (
        <div style={{ backgroundColor: '#f3f4f7' }}>
            {/* Top Navbar */}
            <Navbar />

            <Box height={30} />

            {/* Main Layout with Sidebar and Content */}
            <Box sx={{ display: 'flex' }}>

                {/* Sidebar */}
                <Sidenav />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box height={20} />

                    {/* Admin Top Summary */}
                    <Admintop />

                    <Box height={30} />

                    {/* Charts Row */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        {/* Line Chart */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '70vh' }}>
                                <Linechart />
                            </Card>
                        </Grid>

                        {/* Area Bump Chart */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '70vh' }}>
                                <Areabump />
                            </Card>
                        </Grid>
                    </Grid>

                    <Box height={20} />

                    {/* Stack for Other Cards */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack spacing={3}>

                                {/* Bar Chart */}
                                <Card sx={{ height: '70vh' }}>
                                    <Barchart />
                                </Card>

                                <Box height={20} />
                                <Card sx={{ height: '70vh' }}>
                                    <Scatterplot />
                                </Card>
                               

                            </Stack>
                        </Grid>
                    </Grid>

                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Charts;
