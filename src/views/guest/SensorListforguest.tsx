import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';  // Import axios

interface Sensor {
  id: number;
  name: string;
}

export default function SensorListforguest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sensors, setSensors] = React.useState<Sensor[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  // Fetch sensor data using axios
  React.useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sensors/list');
        const data = response.data;

        // Format the data
        const formattedData = data.map((sensor: any) => ({
          id: sensor.id,
          name: sensor.name,
        }));

        setSensors(formattedData);
      } catch (error) {
        console.error('Error fetching sensors:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSensors();
  }, []);

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Render loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading sensors</div>;

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sensor table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sensor) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={sensor.id}>
                <TableCell align="center">{sensor.id}</TableCell>
                <TableCell>{sensor.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sensors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
