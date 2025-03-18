/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../axios'; // Ensure axios is correctly set up in your project
import { SensorData } from '../types/sensor.types'; // Ensure SensorData is correctly typed

// Interface for sensor response
interface SensorResponse {
  id: string;
  name: string;
}

// Interface for sensor data query parameters (optional)
interface SensorDataQuery {
  from?: string;
  to?: string;
  limit?: number;
  ordering?: 'ASC' | 'DESC' | null;
}

// The sensorService to handle API calls related to sensors
export const sensorService = {
  // Create a new sensor
  async createSensor(sensorData: SensorData): Promise<string> {
    try {
      const response = await api.post<string>('/api/sensors/create', sensorData);
      return response.data; // Return the sensor ID or a success message
    } catch (error) {
      throw new Error('Failed to create sensor: ' + error.message); // Error handling
    }
  },

  // List all sensors
  async listSensors(): Promise<SensorResponse[]> {
    try {
      const response = await api.get<SensorResponse[]>('/api/sensors/list');
      return response.data; // Return the list of sensors
    } catch (error) {
      throw new Error('Failed to fetch sensors: ' + error.message); // Error handling
    }
  },

  // Get details of a single sensor by its ID
  async getSensorDetails(sensorId: string): Promise<any> {
    try {
      const response = await api.get(`/api/sensors/${sensorId}`);
      return response.data; // Return sensor details
      console.log(response)
    } catch (error) {
      throw new Error('Failed to fetch sensor details: ' + error.message); // Error handling
    }
  },

  // Edit an existing sensor
  async editSensor(sensorId: string, sensorData: Partial<SensorData>): Promise<void> {
    try {
      await api.put(`/api/sensors/${sensorId}/edit`, sensorData);
    } catch (error) {
      throw new Error('Failed to edit sensor: ' + error.message); // Error handling
    }
  },

  // Delete a sensor by its ID
  async deleteSensor(sensorId: string): Promise<void> {
    try {
      await api.delete(`/api/sensors/${sensorId}/delete`);
    } catch (error) {
      throw new Error('Failed to delete sensor: ' + error.message); // Error handling
    }
  }
};

export default sensorService 