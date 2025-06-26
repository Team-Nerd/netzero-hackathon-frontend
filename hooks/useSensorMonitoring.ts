import { useState, useEffect, useCallback, useRef } from 'react';
import { SensorService } from '@/services/SensorService';
import { SENSOR_CONFIG } from '@/constants';
import { HarshEvent, AccelerometerData, SensorMonitoringState } from '@/types';

export function useSensorMonitoring() {
  const [state, setState] = useState<SensorMonitoringState>({
    isActive: false,
    ecoScore: 100,
    harshEvents: [],
    currentAcceleration: null,
    isHarshEvent: false,
    tripStartTime: undefined,
  });
  
  const harshEventTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  /**
   * Calculate eco score based on harsh events
   */
  const calculateEcoScore = useCallback((harshEventsCount: number): number => {
    const score = 100 - (harshEventsCount * SENSOR_CONFIG.ECO_SCORE_PENALTY);
    return Math.max(0, Math.min(100, score)); // Clamp between 0 and 100
  }, []);
  
  /**
   * Start monitoring sensors
   */
  const startMonitoring = useCallback(async () => {
    try {
      // Check if accelerometer is available
      const isAvailable = await SensorService.isAvailable();
      if (!isAvailable) {
        console.error('Accelerometer is not available on this device');
        return;
      }
      
      // Set update interval
      SensorService.setUpdateInterval(SENSOR_CONFIG.UPDATE_INTERVAL);
      
      // Reset state for new trip
      setState({
        isActive: true,
        ecoScore: 100,
        harshEvents: [],
        currentAcceleration: null,
        isHarshEvent: false,
        tripStartTime: new Date(),
      });
      
      // Start monitoring
      SensorService.startMonitoring((data, isHarsh, harshEvent) => {
        setState(prevState => {
          const newHarshEvents = harshEvent 
            ? [...prevState.harshEvents, harshEvent]
            : prevState.harshEvents;
          
          // Only update isHarshEvent if there's a new harsh event
          // Otherwise, keep the previous state (which the timeout will clear)
          const newState: SensorMonitoringState = {
            ...prevState,
            currentAcceleration: data,
            isHarshEvent: isHarsh ? true : prevState.isHarshEvent,
            harshEvents: newHarshEvents,
            ecoScore: calculateEcoScore(newHarshEvents.length),
          };
          
          // Clear harsh event indicator after 2 seconds
          if (isHarsh) {
            if (harshEventTimeoutRef.current) {
              clearTimeout(harshEventTimeoutRef.current);
            }
            harshEventTimeoutRef.current = setTimeout(() => {
              setState(prev => ({ ...prev, isHarshEvent: false }));
            }, 3000); // Show warning for 3 seconds
          }
          
          return newState;
        });
      });
    } catch (error) {
      console.error('Failed to start sensor monitoring:', error);
    }
  }, [calculateEcoScore]);
  
  /**
   * Stop monitoring sensors
   */
  const stopMonitoring = useCallback(() => {
    SensorService.stopMonitoring();
    
    // Clear any pending timeouts
    if (harshEventTimeoutRef.current) {
      clearTimeout(harshEventTimeoutRef.current);
      harshEventTimeoutRef.current = null;
    }
    
    setState(prevState => ({
      ...prevState,
      isActive: false,
      isHarshEvent: false,
      currentAcceleration: null,
    }));
  }, []);
  
  /**
   * Get trip duration in seconds
   */
  const getTripDuration = useCallback((): number => {
    if (!state.tripStartTime) return 0;
    return Math.floor((Date.now() - state.tripStartTime.getTime()) / 1000);
  }, [state.tripStartTime]);
  
  /**
   * Clean up on unmount
   */
  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, [stopMonitoring]);
  
  return {
    // State
    isActive: state.isActive,
    ecoScore: state.ecoScore,
    harshEvents: state.harshEvents,
    currentAcceleration: state.currentAcceleration,
    isHarshEvent: state.isHarshEvent,
    tripStartTime: state.tripStartTime,
    
    // Computed values
    tripDuration: getTripDuration(),
    harshEventCount: state.harshEvents.length,
    
    // Actions
    startMonitoring,
    stopMonitoring,
  };
}