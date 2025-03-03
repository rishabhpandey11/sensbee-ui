import React from 'react';
import Admintop from '../admin/Admintop';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Linechart from '../../components/Charts/Linechart';
import Areabump from '../../components/Charts/Areabump';
import Barchart from '../../components/Charts/Barchart';
import Footer from '../../components/Footer';
import Userlistforuser from './Userlistforuser';
import Sensorlist from '../../components/Sensor/Sensorlist';

const UserDashboard = () => {
    return (
        <div style={{ backgroundColor: '#f3f4f7' }}>



            <Box sx={{ display: 'flex' }}>



                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    {/* Admin Top Summary */}
                    <Admintop />

                  



                    <Box height={30} />

                    {/* Stack for Other Cards */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack spacing={3}>
                                {/* Sensor List */}
                                <Card
                                    sx={{
                                        maxHeight: '95vh',
                                        margin: '20px auto',
                                        boxShadow: 3
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            gutterBottom
                                            sx={{
                                                backgroundColor: '#212631', // Light grey background
                                                color: 'white',
                                                padding: '10px 16px', // Padding for better spacing
                                                borderBottom: '2px  #ccc', // Border at the bottom
                                                borderRadius: '4px 4px 0 0', // Rounded corners at the top
                                                fontWeight: 'bold' // Bold text for better visibility
                                            }}
                                        >
                                            Sensor list
                                        </Typography>
                                        <Sensorlist />
                                    </CardContent>
                                </Card>


                                <Box height={20} />

                                {/* User List */}
                                {/* Sensor List */}
                                <Card
                                    sx={{
                                        maxHeight: '95vh',
                                        margin: '20px auto',
                                        boxShadow: 3
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            gutterBottom
                                            sx={{
                                                backgroundColor: '#212631', // Light grey background
                                                color: 'white',
                                                padding: '10px 16px', // Padding for better spacing
                                                borderBottom: '2px  #ccc', // Border at the bottom
                                                borderRadius: '4px 4px 0 0', // Rounded corners at the top
                                                fontWeight: 'bold' // Bold text for better visibility
                                            }}
                                        >
                                            Users list
                                        </Typography>

                                        <Userlistforuser />
                                    </CardContent>
                                </Card>

                                <Box height={20} />


                                {/* Bar Chart */}
                                <Card sx={{ height: { xs: '400px', md: '500px', lg: '500px' } }}>
                                    <Barchart />
                                </Card>

                            </Stack>
                        </Grid>
                    </Grid>
                    <Box height={20} />

                    <Grid container rowSpacing={1} justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        {/* Line Chart */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: { xs: '400px', md: '500px', lg: '500px' } }}>
                                <Linechart />
                            </Card>
                        </Grid>

                        {/* Area Bump Chart */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: { xs: '400px', md: '500px', lg: '500px' } }}>
                                <Areabump />
                            </Card>
                        </Grid>
                    </Grid>

                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default UserDashboard;