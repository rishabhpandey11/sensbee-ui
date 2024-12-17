import React, { useEffect, useState } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

interface ScatterPlotPoint {
    x: string | number; // X-axis value (e.g., date, time, or numeric)
    y: number; // Y-axis value (e.g., sensor value)
}

interface ScatterPlotSeries {
    id: string; // Name or identifier for the sensor
    data: ScatterPlotPoint[]; // Data points for the series
}

const Scatterplot: React.FC = () => {
    const [data, setData] = useState<ScatterPlotSeries[]>([]);

    // Simulated API Call to Fetch Sensor Data
    useEffect(() => {
        const fetchSensorData = async () => {
            // Example data structure fetched from an API
            const apiData: ScatterPlotSeries[] = [
                {
                    id: "Sensor A",
                    data: [
                        { x: "2024-01-01", y: 10 },
                        { x: "2024-01-02", y: 20 },
                        { x: "2024-01-03", y: 30 },
                        { x: "2024-01-04", y: 40 },
                    ],
                },
                {
                    id: "Sensor B",
                    data: [
                        { x: "2024-01-01", y: 50 },
                        { x: "2024-01-02", y: 60 },
                        { x: "2024-01-03", y: 25 },
                        { x: "2024-01-04", y: 70 },
                    ],
                },
                {
                    id: "Sensor C",
                    data: [
                        { x: "2024-01-01", y: 35 },
                        { x: "2024-01-02", y: 55 },
                        { x: "2024-01-03", y: 45 },
                        { x: "2024-01-04", y: 65 },
                    ],
                },
            ];

            // Simulate delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setData(apiData);
        };

        fetchSensorData();
    }, []);

    return (
        <div style={{ height: "400px" }}>
            {data.length > 0 ? (
                <ResponsiveScatterPlot
                    data={data}
                    margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                    xScale={{ type: 'point' }} // "point" for dates, "linear" for numbers
                    yScale={{ type: 'linear', min: 'auto', max: 'auto' }} // Adjust Y-axis automatically
                    blendMode="multiply"
                    nodeSize={10}
                    colors={{ scheme: 'nivo' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendPosition: 'middle',
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Sensor Value',
                        legendPosition: 'middle',
                        legendOffset: -60,
                    }}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 130,
                            translateY: 0,
                            itemsSpacing: 5,
                            itemWidth: 100,
                            itemHeight: 12,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 12,
                            symbolShape: 'circle',
                        },
                    ]}
                    useMesh={true} // For better interactivity
                    tooltip={({ node }) => (
                        <div
                            style={{
                                background: 'white',
                                padding: '9px 12px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <strong>Sensor:</strong> {node.serieId} <br />
                            <strong>Date:</strong> {node.data.x} <br />
                            <strong>Value:</strong> {node.data.y}
                        </div>
                    )}
                />
            ) : (
                <p>Loading sensor data...</p>
            )}
        </div>
    );
};

export default Scatterplot;
