import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LandingPage from '../components/LandingPage/LandingPage';


const Home: React.FC = () => {
  return (
    <div>
      {/* <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box height={20} />

        
         <HeroSection/> */}

         <LandingPage/>

         
        
         

       

          
        {/* </Box>
      </Box> */}
    </div>
  );
}

export default Home;
