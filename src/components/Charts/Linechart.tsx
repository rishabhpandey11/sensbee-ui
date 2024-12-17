import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

interface SensorDataPoint {
    x: string; // Timestamp or label
    y: number; // Sensor value
}

interface SensorData {
    id: string; // Name or identifier for the sensor
    data: SensorDataPoint[];
}

const Linechart: React.FC = () => {
    const [data, setData] = useState<SensorData[]>([]);

    // Simulated API Call to Fetch Sensor Data
    useEffect(() => {
        const fetchSensorData = async () => {
            // Example data structure fetched from an API
            const apiData: SensorData[] = [
                {
                    id: "Sensor A",
                    data: [
                        { x: "2024-01-01", y: 10 },
                        { x: "2024-01-02", y: 20 },
                        { x: "2024-01-03", y: 15 },
                    ],
                },
                {
                    id: "Sensor B",
                    data: [
                        { x: "2024-01-01", y: 25 },
                        { x: "2024-01-02", y: 30 },
                        { x: "2024-01-03", y: 35 },
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
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Date",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Value",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    colors={{ scheme: "nivo" }}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            ) : (
                <p>Loading sensor data...</p>
            )}
        </div>
    );
};

export default Linechart;
