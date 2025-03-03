import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Logout from './pages/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReadSensor from './pages/Sensor/ReadSensor'
import SensorData from './components/Sensor/AnchorTemporaryDrawer'

import NavbarAdmin from './views/admin/NavbarAdmin';


import Addsensor from './pages/Sensor/Addsensor';
import Editsensor from './pages/Sensor/Editsensor';
import Charts from './pages/Charts';

import Edituser from './pages/User/Edituser'
import Adduser from './pages/User/Adduser'
import Userlistpage from './pages/User/Userlistpage'
import NavbarUser from './views/user/NavbarUser';
import Sensorslistpage from './pages/Sensor/Sensorslistpage';
import NavbarGuest from './views/guest/NavbarGuest';

import Create from './pages/Sensor/Create'








const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sensor/read/:id" element={<ReadSensor />} />
          <Route path="/sensor/edit/:id" element={<Editsensor />} />
          <Route path="/sensor/list" element={<Sensorslistpage/>} />
         

          <Route path="/sensor/add" element={<Addsensor />} />
          <Route path="/user/edit/:id" element={<Edituser />} />
          <Route path="/user/add" element={<Adduser />} />
          <Route path="/user/list" element={<Userlistpage />} />




          {/* Admin dashboard */}
          <Route path="/admin" element={<NavbarAdmin/>} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/user" element={<NavbarUser/>} />
          <Route path="/guest" element={<NavbarGuest/>} />


          <Route path="/c" element={<Create/>} />

        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
