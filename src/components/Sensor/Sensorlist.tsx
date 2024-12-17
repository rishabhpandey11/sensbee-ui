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


interface Column {
  id: 'id' | 'name' | 'description' | 'action';
  label: string;
  minWidth?: number;
  align?: 'center' | 'left' | 'right';
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'action', label: 'Action', minWidth: 200, align: 'center' },
];

interface Data {
  id: number;
  name: string;
  description: string;
  action?: React.ReactNode; 
}

function createData(id: number, name: string, description: string): Data {


  return { 
    id,
    name, 
    description, 
    action: (
      <>
        <Button variant="outlined" color="primary" size="small" sx={{ mr: 1 }}>View</Button>
        <Button
          variant="outlined"
          color="success"
          size="small"
          sx={{ mr: 1 }}
          component={Link}
          to="/sensor/edit"
        >
          Edit
        </Button>

        <Button variant="outlined" color="secondary" size="small">Delete</Button>
      </>
    ) 
  };
}

const rows = [
  createData(1, 'Temperature Sensor', 'Monitors and records temperature levels.'),
  createData(2, 'Humidity Sensor', 'Measures and reports the level of humidity.'),
  createData(3, 'Pressure Sensor', 'Detects and measures pressure changes.'),
  createData(4, 'Proximity Sensor', 'Detects nearby objects without physical contact.'),
  createData(5, 'Light Sensor', 'Detects the intensity of ambient light.'),
  createData(6, 'Motion Sensor', 'Detects motion, commonly used in security systems.'),
  createData(7, 'Water Sensor', 'Detects the presence of water or liquid.'),
  createData(8, 'Gas Sensor', 'Detects the presence of various gases in the air.'),
  createData(9, 'Smoke Sensor', 'Detects smoke to warn of potential fire.'),
  createData(10, 'Sound Sensor', 'Detects sound or noise levels.'),
  createData(11, 'Extra Sensor 1', 'This is a placeholder for testing scroll.'),
  createData(12, 'Extra Sensor 2', 'This is a placeholder for testing scroll.'),
  createData(13, 'Extra Sensor 3', 'This is a placeholder for testing scroll.'),
  createData(14, 'Extra Sensor 4', 'This is a placeholder for testing scroll.'),
  createData(15, 'Extra Sensor 5', 'This is a placeholder for testing scroll.'),
];

export default function Sensorlist() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id as keyof Data];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? value : value}
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
