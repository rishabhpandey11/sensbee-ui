import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

function Create() {
    const [columns, setColumns] = useState([{ name: '', valueType: '', valueUnit: '' }]);

    const addColumn = () => {
        setColumns([...columns, { name: '', valueType: '', valueUnit: '' }]);
    };

    const removeColumn = (index) => {
        setColumns(columns.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        const newColumns = [...columns];
        newColumns[index][field] = value;
        setColumns(newColumns);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div style={{ maxWidth: '600px', width: '100%', height: '80vh', overflowY: 'auto', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
                <h5 className="text-center">Columns</h5>
                {columns.map((column, index) => (
                    <Row className="mb-3" key={index}>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={column.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Value Type</Form.Label>
                            <Form.Control required type="text" value={column.valueType} onChange={(e) => handleInputChange(index, 'valueType', e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Value Unit</Form.Label>
                            <Form.Control required type="text" value={column.valueUnit} onChange={(e) => handleInputChange(index, 'valueUnit', e.target.value)} />
                        </Form.Group>
                        <Col md="1" className="d-flex align-items-end">
                            <Button variant="danger" onClick={() => removeColumn(index)} disabled={columns.length === 1}>-</Button>
                        </Col>
                    </Row>
                ))}
                <Button variant="primary" onClick={addColumn}>Add Column</Button>

                <Container style={{ height: "3vh" }}>
    </Container>

                <FloatingLabel controlId="floatingInput" label="Name" className="mb-2">
                    <Form.Control type="text" placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel className="mb-2" controlId="floatingDescription" label="Description">
                    <Form.Control type="text" placeholder="Description" />
                </FloatingLabel>
                <FloatingLabel className="mb-2" controlId="floatingPosition" label="Position eg. [50.35,34.32]">
                    <Form.Control type="text" placeholder="eg. [50.35,34.32]" />
                </FloatingLabel>

                <h5 className="text-center">Permissions</h5>
                <h6>Operations</h6>
                <Form.Check type="switch" id="info-switch" label="INFO" />
                <Form.Check type="switch" id="read-switch" label="READ" />
                <Form.Check type="switch" id="write-switch" label="WRITE" />
                
                <Form.Group controlId="validationCustomRole" className="mt-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>

                <h5 className="text-center mt-3">Storage</h5>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomParams">
                        <Form.Label>Params</Form.Label>
                        <Form.Control required type="text" />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustomVariant">
                        <Form.Label>Variant</Form.Label>
                        <Form.Control required type="text" />
                    </Form.Group>
                </Row>
                
                <Stack direction="horizontal" gap={3} className="mt-3">
                    <Button variant="success">Submit</Button>
                </Stack>
            </div>
        </Container>
    );
}

export default Create;
