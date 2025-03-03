import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'action', label: 'Action', minWidth: 200, align: 'center' },
];

// Fetch sensors from API
const fetchSensors = async () => {
  const response = await fetch('http://localhost:3000/sensors'); // Change API URL as needed
  if (!response.ok) throw new Error('Failed to fetch sensors');
  return response.json();
};

export default function SensorList() {
  const { data: sensors, isLoading, error } = useQuery({
    queryKey: ['sensors'],
    queryFn: fetchSensors,
    staleTime: 10000, // 10 seconds
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading sensors: {error.message}</p>;

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sensor table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#f5f5f5',
                    fontWeight: 'bold',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sensor: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={sensor.id}>
                  <TableCell align="center">{sensor.id}</TableCell>
                  <TableCell>{sensor.name}</TableCell>
                  <TableCell>{sensor.description}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="primary" size="small" sx={{ mr: 1 }}>
                      View
                    </Button>
                  </TableCell>
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
