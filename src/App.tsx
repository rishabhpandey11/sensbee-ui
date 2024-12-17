import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Logout from './pages/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReadSensor from './pages/ManageSensor/ReadSensor'

import AdminDashboard from './views/admin/AdminDashboard';
import UserDashboard from './views/user/UserDashboard';
import GuestDashboard from './views/guest/GuestDashboard';

import Sensorslist from './pages/Sensor/Sensorslist';
import Addsensor from './pages/Sensor/Addsensor';
import Editsensor from './pages/Sensor/Editsensor';
import Charts from './pages/Charts';

import Edituser from './pages/User/Edituser'
import Adduser from './pages/User/Adduser'
import Userlistpage from './pages/User/Userlistpage'








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
          <Route path="/sensor/edit" element={<Editsensor />} />
          <Route path="/sensor/list" element={<Sensorslist />} />
          <Route path="/sensor/add" element={<Addsensor />} />
          <Route path="/user/edit" element={<Edituser />} />
          <Route path="/user/add" element={<Adduser />} />
          <Route path="/user/list" element={<Userlistpage />} />



          {/* Admin dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/guest" element={<GuestDashboard />} />
          <Route path="/charts" element={<Charts />} />


        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
