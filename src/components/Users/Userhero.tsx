import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



export default function Userhero() {
    const navigate = useNavigate();

    return (
        <header style={{ paddingLeft: 0 }}>


            <div
                className='p-5 text-center bg-image'
                style={{ backgroundColor: '#1b9e3e', height: 250 }}
            >
                <div className='mask' style={{ backgroundColor: '#C8AAAA' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>



                            {/* Left Side (Heading and Subheading) */}
                            <div>
                                <h1 className='mb-3' style={{ color: 'black' }}>Register</h1>
                                <h2 className='mb-3' style={{ color: 'black' }} >Users here</h2>
                            </div>

                            {/* Right Side (Button) */}

                            <Button onClick={() => navigate("/user/add")}  variant="dark" >Add</Button>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}