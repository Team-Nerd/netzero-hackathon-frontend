// App constants

export const SENSOR_CONFIG = {
  UPDATE_INTERVAL: 100, // milliseconds
  HARSH_THRESHOLD: 4.5, // m/s² (approx 0.46g) - typical harsh driving threshold
  HARSH_EVENT_COOLDOWN: 3000, // milliseconds - matches warning display duration
  ECO_SCORE_PENALTY: 5, // points deducted per harsh event
} as const;

export const STORAGE_KEYS = {
  TRIP_HISTORY: '@ecodrive_trip_history',
  USER_STATS: '@ecodrive_user_stats',
  USER_SETTINGS: '@ecodrive_user_settings',
  CURRENT_TRIP: '@ecodrive_current_trip',
} as const;

export const DEFAULT_SETTINGS = {
  harshThreshold: SENSOR_CONFIG.HARSH_THRESHOLD,
  coachingEnabled: true,
  soundEnabled: true,
  hapticEnabled: true,
  units: 'metric' as const,
};

export const DEFAULT_USER_STATS = {
  totalTrips: 0,
  bestEcoScore: 0,
  totalCO2Saved: 0,
  totalFuelSaved: 0,
  totalDistance: 0,
  averageEcoScore: 0,
};

export const TRIP_CONFIG = {
  MAX_HISTORY_COUNT: 10,
  MIN_TRIP_DURATION: 60, // seconds
} as const;

// Estimation factors
export const ESTIMATION_FACTORS = {
  // Based on average fuel consumption reduction with eco-driving
  FUEL_SAVED_PER_SMOOTH_KM: 0.02, // liters per km
  CO2_PER_LITER: 2.31, // kg CO2 per liter of gasoline
  AVG_HARSH_EVENT_FUEL_WASTE: 0.05, // liters per harsh event
} as const;