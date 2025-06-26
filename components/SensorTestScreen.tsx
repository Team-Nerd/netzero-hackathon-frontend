import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSensorMonitoring } from '@/hooks/useSensorMonitoring';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

export function SensorTestScreen() {
  const {
    isActive,
    ecoScore,
    harshEvents,
    currentAcceleration,
    isHarshEvent,
    tripDuration,
    harshEventCount,
    startMonitoring,
    stopMonitoring,
  } = useSensorMonitoring();
  
  const [timer, setTimer] = useState(0);
  
  // Update timer display
  useEffect(() => {
    if (!isActive) {
      setTimer(0);
      return;
    }
    
    const interval = setInterval(() => {
      setTimer(tripDuration);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive, tripDuration]);
  
  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Keep screen awake when monitoring is active
  useEffect(() => {
    if (isActive) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [isActive]);
  
  return (
    <View className="flex-1 bg-gray-100">
      
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-2xl font-bold text-center">
          Sensor Monitoring Test
        </Text>
      </View>
      
      {/* Status and Controls */}
      <View className="bg-white m-4 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold">
            Status: {isActive ? 'Active' : 'Inactive'}
          </Text>
          <View className={`px-3 py-1 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}>
            <Text className="text-white font-bold">
              {isActive ? 'ON' : 'OFF'}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={isActive ? stopMonitoring : startMonitoring}
          className={`py-3 px-6 rounded-full ${
            isActive ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isActive ? 'Stop Monitoring' : 'Start Monitoring'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Trip Stats */}
      <View className="bg-white mx-4 mb-4 p-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold mb-2">Trip Statistics</Text>
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="text-gray-600">Duration</Text>
            <Text className="text-2xl font-bold">{formatTime(timer)}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-600">Eco Score</Text>
            <Text className="text-2xl font-bold text-green-600">{ecoScore}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-600">Harsh Events</Text>
            <Text className="text-2xl font-bold text-red-600">{harshEventCount}</Text>
          </View>
        </View>
      </View>
      
      {/* Real-time Acceleration Data */}
      <View className="bg-white mx-4 mb-4 p-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold mb-2">Acceleration Data</Text>
        {currentAcceleration ? (
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">X-axis:</Text>
              <Text className="font-mono">{currentAcceleration.x.toFixed(3)} g</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Y-axis:</Text>
              <Text className="font-mono">{currentAcceleration.y.toFixed(3)} g</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Z-axis:</Text>
              <Text className="font-mono">{currentAcceleration.z.toFixed(3)} g</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 font-semibold">Magnitude:</Text>
              <Text className="font-mono font-bold">
                {currentAcceleration.magnitude?.toFixed(2) || '0.00'} m/s²
              </Text>
            </View>
          </View>
        ) : (
          <Text className="text-gray-500 text-center">
            Start monitoring to see acceleration data
          </Text>
        )}
      </View>
      
      {/* Harsh Event Alert */}
      {isHarshEvent && (
        <View className="absolute inset-0 bg-red-500/30 items-center justify-center pointer-events-none">
          <View className="bg-red-600 px-8 py-4 rounded-lg">
            <Text className="text-white text-2xl font-bold text-center">
              HARSH EVENT DETECTED!
            </Text>
            <Text className="text-white text-center mt-1">
              Drive more smoothly to save fuel
            </Text>
          </View>
        </View>
      )}
      
      {/* Recent Harsh Events */}
      <View className="bg-white mx-4 p-4 rounded-lg shadow-md flex-1">
        <Text className="text-lg font-semibold mb-2">Recent Harsh Events</Text>
        <ScrollView className="flex-1">
          {harshEvents.length > 0 ? (
            harshEvents.map((event) => (
              <View key={event.id} className="border-b border-gray-200 py-2">
                <View className="flex-row justify-between">
                  <Text className="font-semibold">
                    {event.type === 'harsh_braking' ? '🛑 Harsh Braking' : '🚀 Harsh Acceleration'}
                  </Text>
                  <Text className="text-gray-600">
                    {event.magnitude.toFixed(2)} m/s²
                  </Text>
                </View>
                <Text className="text-gray-500 text-sm">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center">
              No harsh events detected yet
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}