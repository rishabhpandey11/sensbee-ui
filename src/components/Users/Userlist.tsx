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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../service/services/user.service';
import { Snackbar, Alert } from '@mui/material';

interface Column {
  id: 'id' | 'name' | 'email' | 'verified' | 'action';
  label: string;
  minWidth?: number;
  align?: 'center' | 'left' | 'right';
}

interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'verified', label: 'Verified', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
];

export default function UserList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.listUsers,
  });

  // Mutation for deleting users
  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSnackbarMessage('User successfully deleted!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: () => {
      setSnackbarMessage('Error deleting user.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  // Mutation for verifying users
  const verifyMutation = useMutation({
    mutationFn: userService.verifyUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSnackbarMessage('User successfully verified!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: () => {
      setSnackbarMessage('Error verifying user.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: string) => deleteMutation.mutate(id);
  const handleVerify = (id: string) => verifyMutation.mutate(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow hover key={user.id}>
                {columns.map((column) => {
                  let value;
                  if (column.id === 'action') {
                    value = (
                      <>
                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(user.id)}>
                          Delete
                        </Button>
                      </>
                    );
                  } else if (column.id === 'verified') {
                    value = user.verified ? (
                      'Yes'
                    ) : (
                      <Button variant="outlined" color="primary" size="small" onClick={() => handleVerify(user.id)}>
                        Verify
                      </Button>
                    );
                  } else {
                    value = user[column.id as keyof User];
                  }

                  return <TableCell key={column.id} align={column.align}>{value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Snackbar for success or error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={8000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar at the top
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
