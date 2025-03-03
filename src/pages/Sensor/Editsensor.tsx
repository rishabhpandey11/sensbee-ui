import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

type Column = {
  name: string;
  val_type: string;
  val_unit: string;
};

const Editsensor: React.FC = () => {
  const { id } = useParams(); // Get sensor ID from URL
  const navigate = useNavigate();

  const [sensor, setSensor] = useState({
    name: '',
    description: '',
  });

  const [position, setPosition] = useState('');
  const [columns, setColumns] = useState<Column[]>([]);

  const [error, setError] = useState<string>('');

  // Fetch sensor details when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3000/sensors/${id}`)
      .then((res) => {
        const sensorData = res.data;
        setSensor({
          name: sensorData.name,
          description: sensorData.description,
        });
        setPosition(sensorData.position.join(', '));
        setColumns(sensorData.columns || []);
      })
      .catch(() => setError('Failed to load sensor details.'));
  }, [id]);

  // Handle input change for Name, Description, and Position
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSensor({ ...sensor, [name]: value });
  };

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  // Handle column input changes
  const handleColumnChange = (index: number, field: keyof Column, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
  };

  // Add a new column
  const addColumn = () => {
    setColumns([...columns, { name: '', val_type: 'FLOAT', val_unit: '' }]);
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sensor.name || !sensor.description || !position) {
      setError('Please fill out all required fields');
      return;
    }

    const updatedData = {
      name: sensor.name,
      description: sensor.description,
      position: position.split(',').map((coord) => parseFloat(coord.trim())),
      columns,
    };

    axios
      .patch(`http://localhost:3000/sensors/${id}`, updatedData)
      .then(() => navigate(-1)) // Redirect to sensor list
      .catch(() => setError('Failed to update sensor details.'));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '35rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title>Edit Sensor Details</Card.Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form onSubmit={handleSubmit}>
            {/* Name & Description Section */}
            <Card className="mb-3 p-3">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={sensor.name}
                  onChange={handleChange}
                  placeholder="Enter sensor name"
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={sensor.description}
                  onChange={handleChange}
                  placeholder="Enter sensor description"
                />
              </Form.Group>
            </Card>

            {/* Position Section */}
            <Card className="mb-3 p-3">
              <Form.Label>Position (Latitude, Longitude)</Form.Label>
              <Form.Control
                type="text"
                value={position}
                onChange={handlePositionChange}
                placeholder="Enter position (e.g., 12.34, 56.78)"
              />
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
              <Button variant="outline-primary" onClick={addColumn}>
                + Add Column
              </Button>
            </Card>

            {/* Actions Section */}
            <div className="d-flex justify-content-between">
              <Button variant="dark" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button variant="success" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Editsensor;
