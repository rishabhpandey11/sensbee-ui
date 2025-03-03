import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface GraphComponentProps {
  sensorData: { time: string; [key: string]: string }[];
}

const Linechartdrawer: React.FC<LinechartdrawerProps> = ({ sensorData }) => {
  // Prepare the data for the graph
  const labels = sensorData.map((data) => data.time); // Extract time values for X-axis

  // Prepare the dataset for Nivo
  const datasets = Object.keys(sensorData[0])
    .filter((key) => key !== 'time') // Exclude the time field from the dataset
    .map((key) => ({
      id: key,
      data: sensorData.map((data) => ({
        x: data.time,
        y: parseFloat(data[key]), // Convert the sensor value to a number
      })),
    }));

  return (
    <ResponsiveLine
      data={datasets}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        grid: true, // Enable grid on the X-axis
        tickValues: 'every 1', // Optional: Show every tick
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Sensor Values',
        legendOffset: -40,
        grid: true, // Enable grid on the Y-axis
        tickValues: 'auto',
      }}
      colors={{ scheme: 'set1' }} // Nivo color scheme
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      useMesh={true}
      enableSlices="x"
      sliceTooltip={({ slice }) => (
        <div style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '5px' }}>
          <strong>{slice.points[0].data.xFormatted}</strong>
          {slice.points.map((point) => (
            <div key={point.id}>
              {point.serieId}: {point.data.yFormatted}
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default Linechartdrawer;
