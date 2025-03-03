import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../service/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function Adduser() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null); // Handles form validation errors

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Generic handler for all form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Mutation for registering users
    const registerMutation = useMutation({
        mutationFn: userService.registerUser, // The mutation function for registering a user
        onSuccess: () => {
    
            queryClient.invalidateQueries({ queryKey: ['users'] }); // Invalidate the 'users' query to refetch fresh data
        },
        onError: (error) => {
            console.error("Error during registration:", error); // Log the error
        },
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error message

        // Basic validation: Check if all fields are filled in
        if (!values.name || !values.email || !values.password) {
            setError('All fields are required!');
            return;
        }

        // Call the mutation function to register the user
        registerMutation.mutate(
            { name: values.name, email: values.email, password: values.password },
            {
                onSuccess: () => {
                    navigate(0); // Redirect to the sensor page after successful registration
                },
                onError: (error: any) => {
                    setError(error.message); // Show the error message
                },
            }
        );
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '30rem', padding: '20px', borderRadius: '10px', margin: '20px auto' }}>
                <Card.Body>
                    <Card.Title style={{ marginBottom: '20px', fontSize: '2rem' }}>Register User</Card.Title>

                    {/* Show error validation message */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

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

                        {/* Button Section */}
                        <div className="d-flex justify-content-between">
                            <Button variant="dark" onClick={() => navigate(-1)}>
                                Back
                            </Button> {/* Go back to the previous page */}
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Adduser;
