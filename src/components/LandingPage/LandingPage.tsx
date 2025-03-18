import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import backgroundImage from './images/image-landingpage.jpg';
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import backgroundImage1 from './images/easytouse.jpg';
import backgroundImage2 from './images/resources.jpg';
import backgroundImage3 from './images/plant1.jpg';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import authStore from '../../service/services/authStore.service'; // Import Zustand store

const LandingPage: React.FC = () => {
    const [showBasic, setShowBasic] = useState<boolean>(false);
    const navigate = useNavigate();

    // ✅ Get authentication state from Zustand
    const { authenticated } = authStore();

    // ✅ Handle navigation based on authentication state
    const handleAdminClick = () => {
        if (authenticated) {
            navigate('/admin'); // Redirect logged-in admin to admin panel
        } else {
            navigate('/login'); // Otherwise, go to login
        }
    };

    const handleUserClick = () => {
        if (authenticated) {
            navigate('/dashboard'); // Redirect logged-in user to user dashboard
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <header>
                {/* Navbar */}
                <MDBNavbar expand="lg" light bgColor="white" sticky>
                    <MDBContainer fluid>
                        <MDBNavbarToggler
                            aria-controls="navbarExample01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setShowBasic(!showBasic)}
                        >
                            <MDBIcon fas icon="bars" />
                        </MDBNavbarToggler>
                        <MDBCollapse navbar show={showBasic}>
                            <MDBNavbarNav right className="mb-2 mb-lg-0">
                                <MDBNavbarItem active>
                                    <MDBNavbarLink aria-current="page" href="#" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                       Sensbee
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                              
                                <MDBNavbarItem>
                                    <MDBNavbarLink  onClick={() => navigate('/about')}>About</MDBNavbarLink>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>

                {/* Hero Section */}
                <div
                    className="p-5 text-center bg-image"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        height: '90vh',
                        width: '100%',
                    }}
                >
                    <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-white">
                                <h1 className="mb-3">Welcome to Sensbee</h1>
                                <h4 className="mb-3">Your City, Your Control.</h4>
                                <h5 className="mb-3">Login to proceed further</h5>

                                {/* ✅ Buttons to Navigate */}
                                <Stack direction="horizontal" gap={3} className="justify-content-center">
                                    <Button
                                        style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#1b9e3e', boxShadow: 'none' }}
                                        onClick={handleAdminClick}
                                    >
                                        Admin
                                    </Button>
                                    <Button
                                        style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'black', boxShadow: 'none' }}
                                        onClick={handleUserClick}
                                    >
                                        User
                                    </Button>
                                    <Button
                                        style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'white', boxShadow: 'none' }}
                                        onClick={() => navigate('/guest')}
                                    >
                                        Guest
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ height: '10vh' }} />

                {/* Feature Section */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <Stack direction="horizontal" gap={3}>
                        <div className="p-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={backgroundImage1}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>Easy to Use, Powerful Results.</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="p-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={backgroundImage2}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>Streamline Your City, Save Your Resources.</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="p-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={backgroundImage3}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>Sustainable Cities, Sustainable Solutions.</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </Stack>
                </div>
            </header>

            <div style={{ height: '20vh' }} />

            {/* Footer */}
            <Footer />
        </>
    );
};

export default LandingPage;
