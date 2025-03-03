import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

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
            <Card
              sx={{
                minWidth: '30%',
                height: 120,
                background: 'linear-gradient(150deg, #4a8206, #83c962)',
                color: 'white',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Users
                </Typography>
                <Typography variant="body2">20</Typography>
              </CardContent>
            </Card>

            {/* Card 2: RAM Total */}
            <Card
              sx={{
                minWidth: '30%',
                height: 120,
                background: 'linear-gradient(135deg, #023d65, #7d66cf)',
                color: 'white',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Sensors
                </Typography>
                <Typography variant="body2">40</Typography>
              </CardContent>
            </Card>

            {/* Card 3: Uptime */}
            <Card
              sx={{
                minWidth: '30%',
                height: 120,
                background: 'linear-gradient(135deg, #7c0707, #ca6969)',
                color: 'white',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Types of Sensors
                </Typography>
                <Typography variant="body2">5</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admintop;
