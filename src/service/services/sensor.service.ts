import api from '../axios'; 
import { SensorData } from '../types/sensor.types';

// Interface for API response
interface SensorResponse {
  id: string;
  name: string;
}

// Sensor Service
export const sensorService = {
  async createSensor(sensorData: SensorData): Promise<string> {
    try {
      const response = await api.post<string>('/api/sensors/create', sensorData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create sensor: ' + (error as Error).message);
    }
  },

  async listSensors(): Promise<SensorResponse[]> {
    try {
      const response = await api.get<SensorResponse[]>('/api/sensors/list');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch sensors: ' + (error as Error).message);
    }
  },

  async getSensorDetails(sensorId: string): Promise<SensorData> {
    try {
      const response = await api.get<SensorData>(`/api/sensors/${sensorId}`);
      return response.data;
      console.log(response.data);
    } catch (error) {
      throw new Error('Failed to fetch sensor details: ' + (error as Error).message);
    }
  },

  async editSensor(sensorId: string, sensorData: Partial<SensorData>): Promise<void> {
    try {
      await api.put(`/api/sensors/${sensorId}/edit`, sensorData);
    } catch (error) {
      throw new Error('Failed to edit sensor: ' + (error as Error).message);
    }
  },

  async deleteSensor(sensorId: string): Promise<void> {
    try {
      await api.delete(`/api/sensors/${sensorId}/delete`);
    } catch (error) {
      throw new Error('Failed to delete sensor: ' + (error as Error).message);
    }
  }
};

export default sensorService;
