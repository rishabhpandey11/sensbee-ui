import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Importing UUID package to generate unique IDs
import { v4 as uuidv4 } from 'uuid';

// Define table columns
const columns = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 200, align: 'center' },
];

// Dummy sensor data with UUID
const mockSensors = [
  { id: uuidv4(), name: 'Temperature Sensor' },
  { id: uuidv4(), name: 'Humidity Sensor' },
  { id: uuidv4(), name: 'Pressure Sensor' },
  { id: uuidv4(), name: 'Light Sensor' },
  { id: uuidv4(), name: 'Motion Sensor' },
  { id: uuidv4(), name: 'Air Quality Sensor' },
  { id: uuidv4(), name: 'Soil Moisture Sensor' },
  { id: uuidv4(), name: 'Sound Sensor' },
  { id: uuidv4(), name: 'Vibration Sensor' },
  { id: uuidv4(), name: 'Proximity Sensor' },
];

export default function SensorList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sensorToDelete, setSensorToDelete] = React.useState<string | null>(null);

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Open and close delete confirmation dialog
  const openDeleteDialog = (sensorId: string) => {
    setSensorToDelete(sensorId);
    setOpenDialog(true);
  };
  const closeDeleteDialog = () => {
    setSensorToDelete(null);
    setOpenDialog(false);
  };

  // Handle delete (For now, just remove from mock data)
  const confirmDelete = () => {
    console.log(`Deleted sensor with ID: ${sensorToDelete}`);
    closeDeleteDialog();
  };

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
            {mockSensors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sensor) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={sensor.id}>
                <TableCell align="center">{sensor.id}</TableCell>
                <TableCell>{sensor.name}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="primary" size="small" sx={{ mr: 1 }} component={Link} to={`/sensor/read/${sensor.id}`}>
                    View
                  </Button>
                  <Button variant="outlined" color="success" size="small" sx={{ mr: 1 }} component={Link} to={`/sensor/edit/${sensor.id}`}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" onClick={() => openDeleteDialog(sensor.id)}>
                    Delete
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
        count={mockSensors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this sensor?</DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
