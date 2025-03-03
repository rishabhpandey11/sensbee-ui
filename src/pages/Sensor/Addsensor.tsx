import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Column = {
  name: string;
  val_type: string;
  val_unit: string;
};

const AddSensor: React.FC = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Local state for sensor details
  const [sensor, setSensor] = useState({
    name: '',
    description: '',
  });

  // Local state for position (as a single string)
  const [position, setPosition] = useState('');

  // Local state for columns
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false); // Track whether the user is adding a column

  // Handle input change for Name & Description
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSensor({ ...sensor, [name]: value });
  };

  // Handle input change for Position
  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  // Start the process of adding a new column
  const startAddColumn = () => {
    setColumns([...columns, { name: '', val_type: '', val_unit: '' }]);
    setIsAddingColumn(true); // User is adding a new column
  };

  // Handle column input changes (name, value type, and unit of column)
  const handleColumnChange = (index: number, field: keyof Column, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
  };

  // Cancel adding a column (remove the last column in the array)
  const cancelAddColumn = () => {
    const updatedColumns = [...columns];
    updatedColumns.pop(); // Remove the last column entry (cancel column addition)
    setColumns(updatedColumns);
    setIsAddingColumn(false); // Stop adding a new column
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sensor.name || !sensor.description || !position) {
      setError('Please fill out all required fields');
      return;
    }

    const sensorData = {
      name: sensor.name,
      description: sensor.description,
      position, // Position entered as a string
      columns,  // Columns with values entered by the user
    };

    console.log('Submitted Sensor Data:', sensorData); // Debugging log
    alert('Sensor data saved locally (check console)');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '35rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title>Add Sensor Details</Card.Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form onSubmit={handleSubmit}>
            {/* Name & Description Section */}
            <Card className="mb-3 p-3">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={sensor.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={sensor.description} onChange={handleChange} />
              </Form.Group>
            </Card>

            {/* Position Section */}
            <Card className="mb-3 p-3">
              <Card.Title>Position</Card.Title>
              <Form.Group controlId="formPosition">
                <Form.Control
                  type="text"
                  placeholder="Enter position e.g.[50.68322,10.91858]"
                  value={position}
                  onChange={handlePositionChange}
                />
              </Form.Group>
            </Card>

            {/* Columns Section */}
            <Card className="mb-3 p-3">
              <Card.Title>Columns</Card.Title>
              {columns.map((col, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={col.name}
                    onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Value Type"
                    value={col.val_type}
                    onChange={(e) => handleColumnChange(index, 'val_type', e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Unit"
                    value={col.val_unit}
                    onChange={(e) => handleColumnChange(index, 'val_unit', e.target.value)}
                  />
                </div>
              ))}
              {!isAddingColumn && (
                <Button variant="outline-primary" onClick={startAddColumn}>
                  + Add Column
                </Button>
              )}
              {isAddingColumn && (
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={cancelAddColumn}>
                    Cancel
                  </Button>
                  <Button variant="outline-primary" onClick={startAddColumn}>
                    Add Another Column
                  </Button>
                </div>
              )}
            </Card>

            {/* Actions Section */}
            <div className="d-flex justify-content-between">
              <Button variant="dark" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddSensor;
