/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SensorColumn {
    name: string;
    val_type: string;
    val_unit: string;
  }
  
  export interface SensorPermission {
    operations: Array<'INFO' | 'READ' | 'WRITE'>;
    role_name: string;
  }
  
  export interface SensorData {
    columns: SensorColumn[];
    description: string;
    name: string;
    permissions: SensorPermission[];
    position: number[];
    storage: {
      params: Record<string, any>;
      variant: string;
    };
  }
  