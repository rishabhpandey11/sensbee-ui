import React from 'react'
import Sensorhero from '../../components/Sensor/Sensorhero'
import Box from '@mui/material/Box';
import Sensorlist from '../../components/Sensor/Sensorlist'

const Sensorslistuserpage = () => {
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

export default Sensorslistuserpage
