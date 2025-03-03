import React from 'react';
import Sidenav from '../views/admin/Sidenavadmin';
import Navbar from '../components/Navbar';
import Admintop from '../views/admin/Admintop';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Linechart from '../components/Charts/Linechart';
import Areabump from '../components/Charts/Areabump';
import Barchart from '../components/Charts/Barchart';
import Scatterplot from '../components/Charts/Scatterplot';
import Footer from '../components/Footer';

const Charts = () => {
    return (
        <div style={{ backgroundColor: '#f3f4f7' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* Admin Top Summary */}
                <Admintop />

                <Box height={30} />

                {/* Charts Row */}
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Line Chart */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{
                                height: { xs: '300px', md: '350px', lg: '500px' }, 
                                p: 2
                            }}
                        >
                            <Linechart />
                        </Card>
                    </Grid>

                    {/* Area Bump Chart */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{
                                height: { xs: '300px', md: '350px', lg: '500px' }, 
                                p: 2
                            }}
                        >
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
                            <Card 
                                sx={{
                                    height: { xs: '400px', md: '500px', lg: '500px' },
                                    p: 2
                                }}
                            >
                                <Barchart />
                            </Card>

                            <Box height={20} />

                            {/* Scatterplot */}
                            <Card 
                                sx={{
                                    height: { xs: '400px', md: '500px', lg: '500px' },
                                    p: 2
                                }}
                            >
                                <Scatterplot />
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Charts;
