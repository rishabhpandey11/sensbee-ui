import React from 'react'
import Sensorlist from '../../components/Sensor/Sensorlist'
import Sensorhero from '../../components/Sensor/Sensorhero'
import Sidenav from '../../views/admin/Sidenavadmin';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';

const Sensorslist = () => {
  return (
   
     <div>
     <Navbar />
     <Box height={30} />
     <Box sx={{ display: 'flex' }}>
       <Sidenav />
       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Box height={30} />
       <Sensorhero/> 
       <Box height={30} />
       <Sensorlist/>
        
        
         
       </Box>
     </Box>
   </div>
  )
}

export default Sensorslist
