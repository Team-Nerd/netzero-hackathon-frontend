import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { useSensorMonitoring } from '@/hooks/useSensorMonitoring';
import { Trip } from '@/types';
import { useKeepAwake } from 'expo-keep-awake';

// Conditional import for Kakao Navigation
let navigateTo: any;
try {
  const kakaoNavi = require('@react-native-kakao/navi');
  navigateTo = kakaoNavi.navigateTo;
} catch (e) {
  console.log('Kakao Navigation not available in Expo Go');
}

export function DrivingScreen() {
  const [tripActive, setTripActive] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const { isHarshEvent, currentMagnitude, ecoScore, harshEventCount, resetTrip } = useSensorMonitoring();
  const [navigationStarted, setNavigationStarted] = useState(false);

  // Start navigation when component mounts
  useEffect(() => {
    startNavigation();
  }, []);

  const startNavigation = async () => {
    try {
      if (navigateTo) {
        // Use real Kakao Navigation in custom build
        const result = await navigateTo({
          destination: {
            name: 'Seoul Station',
            x: 126.9716173,
            y: 37.5546995,
          },
        });
        console.log('Navigation started:', result);
        setNavigationStarted(true);
      } else {
        // Mock navigation for Expo Go development
        console.log('Using mock navigation (Expo Go)');
        setNavigationStarted(true);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Navigation Error', 'Failed to start navigation. For full functionality, create a custom development build.');
    }
  };

  const handleStartTrip = useCallback(() => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      startTime: new Date(),
      endTime: null,
      harshEvents: [],
      distance: 0,
      averageSpeed: 0,
      ecoScore: 100,
    };
    setCurrentTrip(newTrip);
    setTripActive(true);
    resetTrip();
  }, [resetTrip]);

  const handleEndTrip = useCallback(() => {
    if (currentTrip) {
      const endedTrip = {
        ...currentTrip,
        endTime: new Date(),
        ecoScore,
      };
      // Here you would save the trip data
      console.log('Trip ended:', endedTrip);
    }
    setTripActive(false);
    setCurrentTrip(null);
  }, [currentTrip, ecoScore]);

  const formatTime = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Keep screen awake when trip is active
  useKeepAwake();

  return (
    <View className="flex-1 bg-black">
      
      {/* Navigation View */}
      <View className="flex-1 bg-gray-900">
        {navigationStarted ? (
          // Mock navigation UI for development
          <View className="flex-1">
            {/* Mock map view */}
            <View className="flex-1 bg-gray-800">
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-400 text-lg">
                  {navigateTo ? 'Kakao Navigation Active' : 'Mock Navigation (Expo Go)'}
                </Text>
                <Text className="text-gray-500 text-sm mt-2">
                  Destination: Seoul Station
                </Text>
              </View>
              
              {/* Mock navigation instructions */}
              <View className="absolute top-20 left-4 right-4 bg-blue-600 p-4 rounded-lg">
                <Text className="text-white text-lg font-bold">500m ahead</Text>
                <Text className="text-white">Turn right on Sejong-daero</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-400">Loading navigation...</Text>
          </View>
        )}
      </View>

      {/* Coaching Overlay */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        {/* Top Status Bar */}
        <View className="flex-row justify-between items-start p-4 pt-14">
          {/* Trip Timer */}
          {tripActive && currentTrip && (
            <View className="bg-black/70 px-3 py-2 rounded-lg">
              <Text className="text-white text-sm font-bold">
                {formatTime(currentTrip.startTime)}
              </Text>
            </View>
          )}

          {/* Eco Score Badge */}
          {tripActive && (
            <View className="bg-black/70 px-3 py-2 rounded-lg">
              <Text className="text-white text-sm">Eco Score</Text>
              <Text className="text-green-400 text-xl font-bold">{ecoScore}</Text>
            </View>
          )}
        </View>

        {/* Harsh Event Warning Overlay */}
        {isHarshEvent && (
          <View 
            style={StyleSheet.absoluteFillObject} 
            className="bg-red-500/30"
            pointerEvents="none"
          >
            <View className="flex-1 justify-center items-center">
              <View className="bg-red-600/90 px-6 py-4 rounded-xl">
                <Text className="text-white text-2xl font-bold">
                  ⚠️ Harsh Driving Detected!
                </Text>
                <Text className="text-white text-center mt-1">
                  Drive smoothly to save fuel
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Bottom Control Panel */}
        <View className="absolute bottom-0 left-0 right-0 p-4 pb-8">
          {!tripActive ? (
            <TouchableOpacity
              onPress={handleStartTrip}
              className="bg-green-600 px-6 py-4 rounded-xl"
            >
              <Text className="text-white text-center text-lg font-bold">
                Start Trip
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="space-y-3">
              {/* Real-time Metrics */}
              <View className="bg-black/70 px-4 py-3 rounded-lg">
                <View className="flex-row justify-between">
                  <Text className="text-white">Current G-Force:</Text>
                  <Text className={`font-bold ${currentMagnitude > 4.5 ? 'text-red-400' : 'text-green-400'}`}>
                    {currentMagnitude.toFixed(2)} m/s²
                  </Text>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-white">Harsh Events:</Text>
                  <Text className="text-orange-400 font-bold">{harshEventCount}</Text>
                </View>
              </View>

              {/* End Trip Button */}
              <TouchableOpacity
                onPress={handleEndTrip}
                className="bg-red-600 px-6 py-4 rounded-xl"
              >
                <Text className="text-white text-center text-lg font-bold">
                  End Trip
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}