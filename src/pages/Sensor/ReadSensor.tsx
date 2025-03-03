import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define dynamic FileData type
type FileData = {
  time: string;
  [key: string]: string;
};

// Define the Sensor type with flexible data
interface Sensor {
  id: string;
  name: string;
  description: string;
  position: [number, number]; // Latitude & Longitude
  data: FileData[]; // Dynamic data fields
}

// Fetch sensor details
const fetchSensor = async (id: string) => {
  const response = await axios.get<Sensor>(`http://localhost:3000/sensors/${id}`);
  console.log(response.data);
  return response.data;
};

const Read: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, setState] = React.useState({ right: false });

  // Fetch sensor info
  const { data: sensor, isLoading, isError, error } = useQuery({
    queryKey: ['sensor', id],
    queryFn: () => fetchSensor(id!),
    staleTime: 10000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!sensor) return <p>No sensor data found.</p>;

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setState({ ...state, right: open });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h2>Sensor Details</h2>

        <div className="mb-2"><strong>ID:</strong> {sensor.id}</div>
        <div className="mb-2"><strong>Name:</strong> {sensor.name}</div>
        <div className="mb-2"><strong>Description:</strong> {sensor.description}</div>
        <div className="mb-2"><strong>Position:</strong> Lat {sensor.position[0]}, Lon {sensor.position[1]}</div>

        <div className="d-flex justify-content-between mt-4">
          <Link to={`/sensor/edit/${sensor.id}`} className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
            Edit
          </Link>
          <Button className="btn" onClick={() => navigate(-1)} style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }}>
            Back
          </Button>
          <Button className="btn" onClick={toggleDrawer(true)} style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }}>
            View Data
          </Button>
        </div>
      </div>

      {/* Drawer / Modal Section for Data */}
      {state.right && (
        <div className="drawer bg-white p-3 position-absolute top-0 right-0 h-100 w-50">
          <h4>Sensor Data</h4>
          <div className="d-flex justify-content-between mb-2">
            <Button variant="danger" onClick={() => toggleDrawer(false)}>&times; Close</Button>
          </div>
          <div>
            {sensor.data.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Time</th>
                    {Object.keys(sensor.data[0]).map((key, index) => key !== 'time' && <th key={index}>{key}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {sensor.data.map((fileData, index) => (
                    <tr key={index}>
                      <td>{fileData.time}</td>
                      {Object.keys(fileData).map(
                        (key, index) =>
                          key !== 'time' && <td key={index}>{fileData[key]}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available for this sensor.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Read;
