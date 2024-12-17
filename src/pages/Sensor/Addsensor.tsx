import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addsensor() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        position: '' // Position is now a text input
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
        if (!values.name || !values.description || !values.position) {
            setError("All fields are required!");
            return;
        }

        // Prepare post data
        const postData = {
            name: values.name,
            description: values.description,
            position: values.position
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
                                placeholder="Enter sensor name"
                            />
                        </Form.Group>

                        {/* Description Section */}
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                onChange={handleChange} // Use the generic handler
                                placeholder="Enter sensor description"
                            />
                        </Form.Group>

                        {/* Position Section (Text Input) */}
                        <Form.Group className="mb-3" controlId="formPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="position"
                                onChange={handleChange} // Use the generic handler
                                placeholder="Enter position [50.68322, 10.91858]"
                            />
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

export default Addsensor;
