import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { userService } from '../../service/services/user.service';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  // Redirect if no user data was passed
  if (!user) {
    navigate('/user/list');
    return null;
  }

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const updateMutation = useMutation({
    mutationFn: () => userService.updateUser(user.id, { name, email }),
    onSuccess: () => {
      setSnackbarMessage('User updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/user/list'), 2000); // Redirect after success
    },
    onError: () => {
      setSnackbarMessage('Error updating user.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Edit User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </form>
      </CardContent>

      {/* Snackbar for success/error messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default EditUser;