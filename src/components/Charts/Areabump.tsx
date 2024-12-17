import React, { useEffect, useState } from "react";
import { ResponsiveBump } from "@nivo/bump";

interface BumpChartPoint {
    x: string; // Label (e.g., date or category)
    y: number; // Sensor value
}

interface BumpChartSeries {
    id: string; // Name or identifier for the sensor
    data: { x: string; y: number }[]; // Data points for the series
}

const Areabump: React.FC = () => {
    const [data, setData] = useState<BumpChartSeries[]>([]);

    // Simulated API Call to Fetch Sensor Data
    useEffect(() => {
        const fetchSensorData = async () => {
            // Example data structure fetched from an API
            const apiData: BumpChartSeries[] = [
                {
                    id: "Sensor A",
                    data: [
                        { x: "2024-01-01", y: 1 },
                        { x: "2024-01-02", y: 2 },
                        { x: "2024-01-03", y: 3 },
                    ],
                },
                {
                    id: "Sensor B",
                    data: [
                        { x: "2024-01-01", y: 3 },
                        { x: "2024-01-02", y: 1 },
                        { x: "2024-01-03", y: 2 },
                    ],
                },
                {
                    id: "Sensor C",
                    data: [
                        { x: "2024-01-01", y: 2 },
                        { x: "2024-01-02", y: 3 },
                        { x: "2024-01-03", y: 1 },
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
                <ResponsiveBump
                    data={data}
                    margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                    colors={{ scheme: "nivo" }}
                    lineWidth={3}
                    activeLineWidth={6}
                    inactiveLineWidth={3}
                    inactiveOpacity={0.15}
                    pointSize={10}
                    activePointSize={16}
                    inactivePointSize={0}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={3}
                    activePointBorderWidth={3}
                    pointBorderColor={{ from: "serie.color" }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Date",
                        legendPosition: "middle",
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Rank",
                        legendPosition: "middle",
                        legendOffset: -40,
                    }}
                />
            ) : (
                <p>Loading sensor data...</p>
            )}
        </div>
    );
};

export default Areabump;
