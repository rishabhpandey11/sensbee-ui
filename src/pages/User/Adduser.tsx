import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adduser() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        admin: '' // Admin is now a dropdown (Yes/No)
    });

    const [error, setError] = useState(null); // Handles form validation errors

    const navigate = useNavigate();

    // Generic handler for all form field changes
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset error message

        // Basic validation: Check if all fields are filled in
        if (!values.name || !values.email || !values.password || !values.admin) {
            setError("All fields are required!");
            return;
        }

        // Prepare post data
        const postData = {
            name: values.name,
            email: values.email,
            password: values.password,
            admin: values.admin
        };

        // Send POST request to the API
        axios.post('http://localhost:3000/sensor_details', postData)
            .then((res) => {
                console.log('Data submitted successfully:', res);
                navigate('/sensor'); // Redirect to sensor list page after successful submit
            })
            .catch((err) => {
                console.log('Error submitting data:', err);
                setError("Failed to submit sensor data.");
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '30rem', padding: '20px', borderRadius: '10px', margin: '20px auto' }}>
                <Card.Body>
                    <Card.Title style={{ marginBottom: '20px', fontSize: '2rem' }}>Add Sensor Details</Card.Title>

                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message for validation */}

                    <Form onSubmit={handleSubmit}>

                        {/* Name Section */}
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange} // Use the generic handler
                                placeholder="Enter your name"
                                value={values.name}
                            />
                        </Form.Group>

                        {/* Email Section */}
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleChange} // Use the generic handler
                                placeholder="Enter your email"
                                value={values.email}
                            />
                        </Form.Group>

                        {/* Password Section */}
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange} // Use the generic handler
                                placeholder="Enter your password"
                                value={values.password}
                            />
                        </Form.Group>

                        {/* Admin Section (Dropdown) */}
                        <Form.Group className="mb-3" controlId="formAdmin">
                            <Form.Label>Admin</Form.Label>
                            <Form.Select 
                                name="admin" 
                                onChange={handleChange} 
                                value={values.admin}
                            >
                                <option value="">Select Yes or No</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Button Section */}
                        <div className="d-flex justify-content-between">
                            <Button variant="dark" onClick={() => navigate(-1)}>Back</Button> {/* Go back to the previous page */}
                            <Button variant="success" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Adduser;
