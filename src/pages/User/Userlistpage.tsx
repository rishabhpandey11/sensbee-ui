import React from 'react'
import Userhero from '../../components/Users/Userhero'
import Box from '@mui/material/Box';
import Userlist from '../../components/Users/Userlist'

const Userlistpage = () => {
  return (
   
     <div>
  
    
     <Box sx={{ display: 'flex' }}>
     
       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Box height={30} />
       <Userhero/> 
       <Box height={30} />
       <Userlist/>
        
        
         
       </Box>
     </Box>
   </div>
  )
}

export default Userlistpage
