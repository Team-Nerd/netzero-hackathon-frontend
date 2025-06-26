import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import { SENSOR_CONFIG } from '@/constants';
import { HarshEvent, AccelerometerData } from '@/types';

export class SensorService {
  private static subscription: any = null;
  private static lastHarshEventTime: number = 0;
  
  /**
   * Calculate magnitude of acceleration vector
   * Properly accounts for gravity by calculating the total acceleration
   * and subtracting the gravity component
   */
  static calculateMagnitude(data: AccelerometerMeasurement): number {
    const { x, y, z } = data;
    
    // Calculate total acceleration magnitude
    const totalAccel = Math.sqrt(x * x + y * y + z * z);
    
    // Gravity is approximately 1g, so we subtract it from the total
    // This gives us the actual dynamic acceleration regardless of phone orientation
    const dynamicAccel = Math.abs(totalAccel - 1.0) * 9.81;
    
    return dynamicAccel;
  }
  
  /**
   * Determine if acceleration is a harsh event
   */
  static isHarshEvent(magnitude: number): boolean {
    const now = Date.now();
    const timeSinceLastEvent = now - this.lastHarshEventTime;
    
    // Check if we're in cooldown period
    if (timeSinceLastEvent < SENSOR_CONFIG.HARSH_EVENT_COOLDOWN) {
      return false;
    }
    
    if (magnitude > SENSOR_CONFIG.HARSH_THRESHOLD) {
      this.lastHarshEventTime = now;
      return true;
    }
    
    return false;
  }
  
  /**
   * Determine the type of harsh event based on acceleration
   */
  static getHarshEventType(data: AccelerometerMeasurement): 'harsh_braking' | 'harsh_acceleration' {
    // Negative x acceleration = braking (deceleration)
    // Positive x acceleration = acceleration
    // Assuming phone is mounted with top facing forward
    return data.x < 0 ? 'harsh_braking' : 'harsh_acceleration';
  }
  
  /**
   * Create a harsh event object
   */
  static createHarshEvent(
    data: AccelerometerMeasurement,
    magnitude: number
  ): HarshEvent {
    return {
      id: `harsh_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date(),
      type: this.getHarshEventType(data),
      magnitude: magnitude,
    };
  }
  
  /**
   * Set accelerometer update interval
   */
  static setUpdateInterval(interval: number = SENSOR_CONFIG.UPDATE_INTERVAL) {
    Accelerometer.setUpdateInterval(interval);
  }
  
  /**
   * Check if accelerometer is available
   */
  static async isAvailable(): Promise<boolean> {
    try {
      return await Accelerometer.isAvailableAsync();
    } catch (error) {
      console.error('Error checking accelerometer availability:', error);
      return false;
    }
  }
  
  /**
   * Trigger haptic feedback for harsh event
   */
  static async triggerHapticFeedback() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }
  
  /**
   * Start monitoring accelerometer
   */
  static startMonitoring(
    callback: (data: AccelerometerData, isHarsh: boolean, harshEvent?: HarshEvent) => void
  ) {
    if (this.subscription) {
      this.stopMonitoring();
    }
    
    this.subscription = Accelerometer.addListener((accelerometerData) => {
      const magnitude = this.calculateMagnitude(accelerometerData);
      const isHarsh = this.isHarshEvent(magnitude);
      
      const data: AccelerometerData = {
        x: accelerometerData.x,
        y: accelerometerData.y,
        z: accelerometerData.z,
        magnitude,
      };
      
      if (isHarsh) {
        const harshEvent = this.createHarshEvent(accelerometerData, magnitude);
        this.triggerHapticFeedback();
        callback(data, true, harshEvent);
      } else {
        callback(data, false);
      }
    });
  }
  
  /**
   * Stop monitoring accelerometer
   */
  static stopMonitoring() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }
}