import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartData {
    sensor: string; // Sensor name
    value: number;  // Sensor value
}

const Barchart: React.FC = () => {
    const [data, setData] = useState<BarChartData[]>([]);

    // Simulate fetching data
    useEffect(() => {
        const fetchData = async () => {
            const apiData: BarChartData[] = [
                { sensor: "Sensor A", value: 45 },
                { sensor: "Sensor B", value: 72 },
                { sensor: "Sensor C", value: 36 },
                { sensor: "Sensor D", value: 89 },
            ];

            // Simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setData(apiData);
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: "400px" }}>
            {data.length > 0 ? (
                <ResponsiveBar
                    data={data}
                    keys={["value"]}
                    indexBy="sensor"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: "set3" }}
                    enableLabel={true}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Sensors",
                        legendPosition: "middle",
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Value",
                        legendPosition: "middle",
                        legendOffset: -50,
                    }}
                    legends={[
                        {
                            dataFrom: "keys",
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: "left-to-right",
                            itemOpacity: 0.85,
                            symbolSize: 20,
                        },
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            ) : (
                <p>Loading sensor data...</p>
            )}
        </div>
    );
};

export default Barchart;
