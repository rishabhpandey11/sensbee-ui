import React from 'react'
import Sensorlist from '../../components/Sensor/Sensorlist'
import Sensorhero from '../../components/Sensor/Sensorhero'
import Box from '@mui/material/Box';

const Sensorslistpage = () => {
  return (
   
     <div>
    
     <Box sx={{ display: 'flex' }}>
    
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

export default Sensorslistpage
