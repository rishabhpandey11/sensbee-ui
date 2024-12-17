import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import '../../Dash.css';

const Admintop = () => {
  return (
    <div>
      <Box height={20} />
      <Typography variant="h6" gutterBottom>
        Static Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            {/* Card 1: CPU Cores */}
            <Card sx={{ minWidth: '30%', height: 120 }} className="gradient-green">
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                  CPU Cores
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  4
                </Typography>
              </CardContent>
            </Card>

            {/* Card 2: RAM Total */}
            <Card sx={{ minWidth: '30%', height: 120 }} className="gradient-blue">
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                  RAM Total
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  500MB
                </Typography>
              </CardContent>
            </Card>

            {/* Card 3: Uptime */}
            <Card sx={{ minWidth: '30%', height: 120 }} className="gradient-red">
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                  Uptime
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  20.4s
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admintop;
