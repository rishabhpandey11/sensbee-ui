
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sensorService } from '../../service/services/sensor.service';
import { Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText, Button } from '@mui/material';

export default function ReadSensor() {
  const { sensorId } = useParams(); // Get sensor ID from URL
  const navigate = useNavigate();

  // Fetch sensor details
  const { data: sensor, isLoading, isError } = useQuery({
    queryKey: ['sensor', sensorId],
    queryFn: () => sensorService.getSensorDetails(sensorId!),
    enabled: !!sensorId, // Only run query if sensorId is available
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading sensor details</div>;

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the sensor list page
  };

  const handleEditClick = () => {
    navigate(`/sensor/${sensorId}/edit`); // Navigate to the edit page for the sensor
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Sensor Details</Typography>
        <Typography><strong>ID:</strong> {sensor?.sensor_info?.id}</Typography>
        <Typography><strong>Name:</strong> {sensor?.sensor_info?.name}</Typography>
        <Typography><strong>Description:</strong> {sensor?.sensor_info?.description}</Typography>
        <Typography><strong>Owner:</strong> {sensor?.sensor_info?.owner}</Typography>
        <Typography><strong>Storage Type:</strong> {sensor?.sensor_info?.storage_type}</Typography>

        {/* Display Positions */}
        {sensor?.sensor_info?.position?.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Positions</Typography>
            <List>
              {sensor?.sensor_info?.position.map((pos, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={`Position ${index + 1}`} secondary={JSON.stringify(pos)} />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {/* Display Columns */}
        {sensor?.sensor_info?.columns?.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Columns</Typography>
            <List>
              {sensor?.sensor_info?.columns.map((col, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Column Name: ${col.name}`}
                    secondary={
                      <>
                        <Typography><strong>Value Type:</strong> {col.val_type}</Typography>
                        <Typography><strong>Value Unit:</strong> {col.val_unit}</Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {/* Display Permissions */}
        <Typography variant="h6" sx={{ mt: 2 }}>Permissions</Typography>
        <List>
          {sensor?.sensor_info?.permissions?.map((perm, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Role ID: ${perm.role_id}`}
                secondary={
                  <>
                    <Typography><strong>Allow Info:</strong> {perm.allow_info ? '✅ Yes' : '❌ No'}</Typography>
                    <Typography><strong>Allow Read:</strong> {perm.allow_read ? '✅ Yes' : '❌ No'}</Typography>
                    <Typography><strong>Allow Write:</strong> {perm.allow_write ? '✅ Yes' : '❌ No'}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Buttons below */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="outlined" onClick={handleBackClick}>Back</Button>
          <Button variant="outlined" color="success" onClick={handleEditClick}>Edit</Button>
        </div>
      </CardContent>
    </Card>
  );
}

