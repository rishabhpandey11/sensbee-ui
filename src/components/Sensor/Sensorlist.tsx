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
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sensorService } from '../../service/services/sensor.service';

export default function SensorList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sensorToDelete, setSensorToDelete] = React.useState<string | null>(null);

  const queryClient = useQueryClient();

  // Fetch sensors
  const { data: sensors = [], isLoading, isError } = useQuery({
    queryKey: ['sensors'],
    queryFn: sensorService.listSensors,
    staleTime: 1000 * 60 * 5,
  });

  // Mutation for deleting a sensor
  const deleteMutation = useMutation({
    mutationFn: (sensorId: string) => sensorService.deleteSensor(sensorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sensors'] }); // Refresh sensor list
      closeDeleteDialog();
    },
    onError: (error) => {
      console.error('Error deleting sensor:', error);
    },
  });

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

  // Confirm delete
  const confirmDelete = () => {
    if (sensorToDelete) {
      deleteMutation.mutate(sensorToDelete);
    }
  };

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
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sensor) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={sensor.id}>
                <TableCell align="center">{sensor.id}</TableCell>
                <TableCell>{sensor.name}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    component={Link}
                    to={`/sensor/read/${sensor.id}`}
                    state={{ sensor }}
                  >
                    View
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
        count={sensors.length}
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
          <Button onClick={closeDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
