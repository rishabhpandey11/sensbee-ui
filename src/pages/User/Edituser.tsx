import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Editsensor() {
    const [values, setValues] = useState({
        name: 'John Doe', // Example default value
        email: 'johndoe@example.com', // Example default value
        password: 'password123', // Example default value
        admin: '' // Admin is now a dropdown (Yes/No)
    });

    const [error, setError] = useState(null); // Handles form validation errors

    const navigate = useNavigate();

    // Handle change for the admin dropdown only
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset error message

        // Basic validation: Check if admin is selected
        if (!values.admin) {
            setError("Please select admin status (Yes or No)!");
            return;
        }

        // Prepare post data (only admin is editable, but sending all fields)
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
                    <Card.Title style={{ marginBottom: '20px', fontSize: '2rem' }}>Edit Sensor Admin Status</Card.Title>

                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message for validation */}

                    <Form onSubmit={handleSubmit}>

                        {/* Name Section (Read-Only) */}
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                readOnly
                            />
                        </Form.Group>

                        {/* Email Section (Read-Only) */}
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                readOnly
                            />
                        </Form.Group>

                        {/* Password Section (Read-Only) */}
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                readOnly
                            />
                        </Form.Group>

                        {/* Admin Section (Editable) */}
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

export default Editsensor;
