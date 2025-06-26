// Core data types for EcoDrive Coach

export interface HarshEvent {
  id: string;
  timestamp: Date;
  type: 'harsh_braking' | 'harsh_acceleration';
  magnitude: number; // m/s²
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface TripData {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  distance?: number; // kilometers
  harshEvents: HarshEvent[];
  ecoScore: number; // 0-100
  averageSpeed?: number; // km/h
  fuelSaved?: number; // estimated liters
  co2Saved?: number; // estimated kg
  route?: {
    start?: string;
    end?: string;
  };
}

export interface TripSummary {
  duration: number; // minutes
  harshEvents: number; // count
  ecoScore: number; // 0-100
  fuelSaved: string; // simple estimate message
  co2Saved?: number; // kg
}

export interface UserStats {
  totalTrips: number;
  bestEcoScore: number;
  totalCO2Saved: number; // kg
  totalFuelSaved: number; // liters
  totalDistance: number; // km
  averageEcoScore: number;
  lastTripDate?: Date;
}

export interface UserSettings {
  harshThreshold: number; // m/s² (default: 2.5)
  coachingEnabled: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  units: 'metric' | 'imperial';
}

export interface LocalData {
  currentTrip: TripData | null;
  tripHistory: TripData[]; // Last 10 trips
  userStats: UserStats;
  settings: UserSettings;
}

// Sensor data types
export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
  magnitude?: number;
}

export interface SensorMonitoringState {
  isActive: boolean;
  ecoScore: number;
  harshEvents: HarshEvent[];
  currentAcceleration: AccelerometerData | null;
  isHarshEvent: boolean;
  tripStartTime?: Date;
}