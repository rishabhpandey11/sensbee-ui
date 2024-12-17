import React from 'react'
import Userhero from '../../components/Users/Userhero'
import Sidenav from '../../views/admin/Sidenavadmin';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import Userlist from '../../components/Users/Userlist'

const Userlistpage = () => {
  return (
   
     <div>
     <Navbar />
     <Box height={30} />
     <Box sx={{ display: 'flex' }}>
       <Sidenav />
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
