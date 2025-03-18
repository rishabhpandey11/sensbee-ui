// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { Typography, Card, CardContent, Grid, TextField } from '@mui/material';
// import { getSensorDetails } from '../../service/services/sensor.service'; // Ensure this import path is correct
// import { SensorData } from '../../types'; // Assuming you have the proper SensorData type

// const ReadSensor = () => {
//   const { sensorId } = useParams<{ sensorId: string }>(); // Type the sensorId

//   // Use React Query to fetch sensor details
//   const { data: sensor, isLoading, isError, error } = useQuery(
//     ['sensor', sensorId], // Query key includes sensorId to refetch when it changes
//     () => getSensorDetails(sensorId!), // Fetch sensor details using the function
//     {
//       enabled: !!sensorId, // Only run the query if sensorId is available
//     }
//   );

//   // Loading State
//   if (isLoading) return <Typography>Loading...</Typography>;

//   // Error Handling
//   if (isError) return <Typography color="error">{(error as Error).message}</Typography>;

//   // No Data State
//   if (!sensor) return <Typography color="error">No sensor data available.</Typography>;

//   // Destructure sensor properties
//   const { id, name, description, storage, permissions } = sensor;

//   return (
//     <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>Sensor Information</Typography>

//         <Grid container spacing={2}>
//           {/* Sensor Name */}
//           <Grid item xs={12}>
//             <TextField fullWidth label="Sensor Name" value={name} InputProps={{ readOnly: true }} />
//           </Grid>

//           {/* Sensor Description */}
//           <Grid item xs={12}>
//             <TextField fullWidth label="Description" value={description || 'No description'} InputProps={{ readOnly: true }} />
//           </Grid>

//           {/* Sensor ID */}
//           <Grid item xs={12}>
//             <TextField fullWidth label="Sensor ID" value={id} InputProps={{ readOnly: true }} />
//           </Grid>

//           {/* Storage Variant */}
//           <Grid item xs={12}>
//             <TextField fullWidth label="Storage Variant" value={storage?.variant || 'Unknown'} InputProps={{ readOnly: true }} />
//           </Grid>

//           {/* Permissions Section */}
//           {permissions && permissions.length > 0 && (
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>Permissions</Typography>
//               {/* Display permissions */}
//               {permissions.map((perm, index) => (
//                 <Grid container spacing={2} key={index}>
//                   {/* Role Name */}
//                   <Grid item xs={6}>
//                     <TextField fullWidth label="Role Name" value={perm.role_name} InputProps={{ readOnly: true }} />
//                   </Grid>

//                   {/* Operations */}
//                   <Grid item xs={6}>
//                     <TextField
//                       fullWidth
//                       label="Operations"
//                       value={perm.operations.join(', ')} // Join operations as a string
//                       InputProps={{ readOnly: true }}
//                     />
//                   </Grid>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default ReadSensor;
