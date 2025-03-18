import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sensorService } from '../../service/services/sensor.service';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

function Addsensor() {
    const [sensorData, setSensorData] = useState({
        name: '',
        description: '',
        position: '',  // Initialize position as an empty string
        columns: [{ name: '', val_type: '', val_unit: '' }],
        permissions: [{ operations: [], role_name: '' }],  // permissions should be an array of objects
        storage: { params: {}, variant: '' }, // params as an object
    });

    const mutation = useMutation({
        mutationFn: sensorService.createSensor,
        onSuccess: () => {
            alert('Sensor added successfully!');
            setSensorData({
                name: '',
                description: '',
                position: '',
                columns: [{ name: '', val_type: '', val_unit: '' }],
                permissions: [{ operations: [], role_name: '' }],
                storage: { params: {}, variant: '' },
            });
            console.log(sensorData);
        },
     
        onError: (error) => {
            console.error('Error adding sensor:', error);
        },
        
    });
 
    const handleInputChange = (field: string, value: any) => {
        setSensorData((prev) => ({ ...prev, [field]: value }));
    };

    const handleColumnChange = (index: number, field: string, value: string) => {
        setSensorData((prev) => ({
            ...prev,
            columns: prev.columns.map((col, i) => (i === index ? { ...col, [field]: value } : col)),
        }));
    };

    const addColumn = () => {
        setSensorData((prev) => ({
            ...prev,
            columns: [...prev.columns, { name: '', val_type: '', val_unit: '' }],
        }));
    };

    const removeColumn = (index: number) => {
        setSensorData((prev) => ({
            ...prev,
            columns: prev.columns.filter((_, i) => i !== index),
        }));
    };

    const handleStorageParamsChange = (value: string) => {
        try {
            const parsedValue = JSON.parse(value);
            if (typeof parsedValue === 'object' && parsedValue !== null) {
                setSensorData((prev) => ({
                    ...prev,
                    storage: { ...prev.storage, params: parsedValue },
                }));
            } else {
                alert('Params should be a valid JSON object');
            }
        } catch (error) {
            alert('Invalid JSON format');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert position to an array of numbers
        const position = sensorData.position
            .split(',')
            .map((coord) => parseFloat(coord.trim()));

        // Validate position (check if it's an array of numbers)
        if (position.some(isNaN)) {
            alert('Position should be a valid comma-separated list of numbers');
            return;
        }

        // Prepare the formatted data for submission
        const formattedData = {
            name: sensorData.name,
            description: sensorData.description,
            position, // Array of numbers for position
            columns: sensorData.columns, // Array of columns
            permissions: sensorData.permissions, // Permissions array with operations and role_name
            storage: {
                params: sensorData.storage.params, // Params as an object
                variant: sensorData.storage.variant, // Variant as a string
            },
        };

        console.log('Formatted Data for API:', formattedData);  // Log the data for debugging

        mutation.mutate(formattedData); // Call the mutation function with the formatted data
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div style={{ maxWidth: '600px', width: '100%', height: '80vh', overflowY: 'auto', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
                <h5 className="text-center">Add Sensor</h5>
                <Form onSubmit={handleSubmit}>
                    {/* Render columns */}
                    {sensorData.columns.map((column, index) => (
                        <Row className="mb-3" key={index}>
                            <Col md="4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={column.name} onChange={(e) => handleColumnChange(index, 'name', e.target.value)} />
                            </Col>
                            <Col md="4">
                                <Form.Label>Value Type </Form.Label>
                                <Form.Control type="text" placeholder='INT,FLOAT,STRING' value={column.val_type} onChange={(e) => handleColumnChange(index, 'val_type', e.target.value)} />
                            </Col>
                            <Col md="3">
                                <Form.Label>Value Unit</Form.Label>
                                <Form.Control type="text" value={column.val_unit} onChange={(e) => handleColumnChange(index, 'val_unit', e.target.value)} />
                            </Col>
                            <Col md="1" className="d-flex align-items-end">
                                <Button variant="danger" onClick={() => removeColumn(index)} disabled={sensorData.columns.length === 1}>
                                    -
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Button variant="primary" onClick={addColumn}>
                        Add Column
                    </Button>

                    <Container style={{ height: '3vh' }} />

                    {/* Input fields for name, description, and position */}
                    <FloatingLabel controlId="floatingName" label="Name" className="mb-2">
                        <Form.Control type="text" value={sensorData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingDescription" label="Description" className="mb-2">
                        <Form.Control type="text" value={sensorData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPosition" label="Position (e.g., 50.35, 34.32)" className="mb-2">
                        <Form.Control type="text" value={sensorData.position} onChange={(e) => handleInputChange('position', e.target.value)} />
                    </FloatingLabel>

                    <h5 className="text-center">Permissions</h5>
                    {['INFO', 'READ', 'WRITE'].map((operation) => (
                        <Form.Check
                            key={operation}
                            type="checkbox"
                            label={operation}
                            checked={sensorData.permissions[0].operations.includes(operation)} // Update the operations inside the permissions array
                            onChange={() =>
                                handleInputChange('permissions', [{
                                    ...sensorData.permissions[0],
                                    operations: sensorData.permissions[0].operations.includes(operation)
                                        ? sensorData.permissions[0].operations.filter((op) => op !== operation)
                                        : [...sensorData.permissions[0].operations, operation],
                                }])
                            }
                        />
                    ))}

                    <Form.Group controlId="validationCustomRole" className="mt-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            value={sensorData.permissions[0].role_name} // Access role_name inside the permissions array
                            onChange={(e) => handleInputChange('permissions', [{ ...sensorData.permissions[0], role_name: e.target.value }])}
                        />
                    </Form.Group>

                    <h5 className="text-center mt-3">Storage</h5>
                    <Row className="mb-3">
                        <Col md="6">
                            <Form.Label>Params</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={JSON.stringify(sensorData.storage.params, null, 2)}
                                onChange={(e) => handleStorageParamsChange(e.target.value)}
                            />
                        </Col>
                        <Col md="6">
                            <Form.Label>Variant</Form.Label>
                            <Form.Control
                                 as="textarea"
                                 rows={3}
                                value={sensorData.storage.variant}
                                placeholder=' DEFAULT, RINGBUFFERCOUNT, RINGBUFFERINTERVAL'
                                onChange={(e) => handleInputChange('storage', { ...sensorData.storage, variant: e.target.value })}
                            />
                        </Col>
                    </Row>

                    <Stack direction="horizontal" gap={3} className="mt-3">
                        <Button type="submit" variant="success" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Stack>
                </Form>
            </div>
        </Container>
    );
}

export default Addsensor;
