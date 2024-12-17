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
import backgroundImage from './images/pexels-steve-29612112-min.webp';
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import backgroundImage1 from './images/easytouse.jpg';
import backgroundImage2 from './images/resources.jpg';
import backgroundImage3 from './images/plant1.jpg';
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [showBasic, setShowBasic] = useState<boolean>(false); // Typed state for the collapse toggle
    const navigate = useNavigate();

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
                                        Small City UI
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="#">Home</MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="#">About</MDBNavbarLink>
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
                                <h1 className="mb-3">Welcome to Smart City Solutions</h1>
                                <h4 className="mb-3">Your City, Your Control.</h4>
                                <h5 className="mb-3">Login to proceed further</h5>

                                <div
                                    style={{
                                        display: 'flex', // Make the parent a flex container
                                        justifyContent: 'center', // Align the stack to the right
                                        alignItems: 'center', // Vertically center the stack
                                    }}
                                >
                                    <Stack direction="horizontal" gap={3}>
                                        <Button
                                            style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                backgroundColor: '#1b9e3e',
                                                boxShadow: 'none', // Remove button shadow
                                            }}
                                            onClick={() => navigate('/admin')}
                                        >
                                            Admin
                                        </Button>
                                        <Button
                                            style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                backgroundColor: 'black',
                                                boxShadow: 'none', // Remove button shadow
                                            }}
                                            onClick={() => navigate('/user')}
                                        >
                                            User
                                        </Button>
                                        <Button
                                            style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                backgroundColor: 'white',
                                                boxShadow: 'none', // Remove button shadow
                                            }}
                                            onClick={() => navigate('/guest')}
                                        >
                                            Guest
                                        </Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ height: '10vh' }} />

                {/* Feature Section */}
                <div
                    style={{
                        display: 'flex', // Make the parent a flex container
                        justifyContent: 'center', // Align the stack to the center
                        alignItems: 'center', // Vertically center the stack
                        height: '50vh', // Full height of the viewport
                    }}
                >
                    <Stack direction="horizontal" gap={3}>
                        <div className="p-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={backgroundImage1}
                                    style={{
                                        height: '200px', // Adjust image height as needed
                                        objectFit: 'cover', // Ensures the image covers the card area without distortion
                                    }}
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
                                    style={{
                                        height: '200px', // Adjust image height as needed
                                        objectFit: 'cover', // Ensures the image covers the card area without distortion
                                    }}
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
                                    style={{
                                        height: '200px', // Adjust image height as needed
                                        objectFit: 'cover', // Ensures the image covers the card area without distortion
                                    }}
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

           <Footer/>
        </>
    );
};

export default LandingPage;
