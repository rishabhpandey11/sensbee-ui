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

interface Column {
  id: 'id' | 'name' | 'email' | 'password' | 'admin' | 'action'; // Added action column
  label: string;
  minWidth?: number;
  align?: 'center' | 'left' | 'right';
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' }, // ID column
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'password', label: 'Password', minWidth: 150, align: 'center' },
  { id: 'admin', label: 'Admin', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 150, align: 'center' }, // Updated Action column width
];

interface Data {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: string; // Yes or No
}

function createData(id: number, name: string, email: string, password: string, admin: boolean): Data {
  return { 
    id, 
    name, 
    email, 
    password, 
    admin: admin ? 'Yes' : 'No' 
  };
}

const initialRows = [
  createData(1, 'John Doe', 'john.doe@example.com', 'password123', true),
  createData(2, 'Jane Smith', 'jane.smith@example.com', 'abc456', false),
  createData(3, 'Robert Brown', 'robert.brown@example.com', 'pass789', true),
  createData(4, 'Emily Davis', 'emily.davis@example.com', 'secure321', false),
  createData(5, 'Michael Wilson', 'michael.wilson@example.com', 'mypassword', true),
  createData(6, 'Emma Johnson', 'emma.johnson@example.com', 'password456', false),
  createData(7, 'Liam Miller', 'liam.miller@example.com', 'newpassword', true),
  createData(8, 'Sophia Taylor', 'sophia.taylor@example.com', 'mypassword123', false),
  createData(9, 'Olivia Anderson', 'olivia.anderson@example.com', 'test123', true),
  createData(10, 'James Thomas', 'james.thomas@example.com', 'qwerty123', false),
  createData(11, 'Isabella Harris', 'isabella.harris@example.com', 'zxcvbnm', true),
  createData(12, 'Mason Moore', 'mason.moore@example.com', '12345678', false),
  createData(13, 'Charlotte White', 'charlotte.white@example.com', 'password', true),
  createData(14, 'Lucas Martin', 'lucas.martin@example.com', 'adminpass', false),
  createData(15, 'Amelia Thompson', 'amelia.thompson@example.com', 'strongpassword', true),
];

export default function Userlistforuser() {
  const [rows, setRows] = React.useState(initialRows); // Rows are now stateful
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to delete a row by its id
  const handleDelete = (id: number) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };

  // Function to view a user's details
  const handleView = (row: Data) => {
    console.log('User details:', row);
    alert(`Viewing User: \nID: ${row.id} \nName: ${row.name} \nEmail: ${row.email}`);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="user table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#f5f5f5', // Light gray background
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    let value;
                    
                    // Special case for the action column
                    if (column.id === 'action') {
                      value = (
                        <>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            size="small" 
                            onClick={() => handleView(row)} 
                            sx={{ mr: 1 }}
                          >
                            View
                          </Button>
                       
                        </>
                      );
                    } else {
                      value = row[column.id as keyof Data];
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
