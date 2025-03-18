import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

function ReadUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // Retrieve the user object from state

  // If no user data is found, show an error message
  if (!user) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 5 }}>
        No user data found.
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>User Details</Typography>
        <Typography><strong>ID:</strong> {user.id}</Typography>
        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</Typography>
        <Typography>
          <strong>Roles:</strong>{" "}
          {user.roles && user.roles.length > 0
            ? user.roles.map((role) => role.name).join(", ")
            : "No roles"}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          onClick={() => navigate('/user/list')}
        >
          Back
        </Button>
        
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/user/edit', { state: { user } })}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
}

export default ReadUser;
