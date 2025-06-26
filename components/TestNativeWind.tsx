import React from 'react';
import { View, Text } from 'react-native';

export function TestNativeWind() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="bg-green-500 p-6 rounded-lg shadow-lg">
        <Text className="text-white text-2xl font-bold">
          NativeWind is working! 🎉
        </Text>
        <Text className="text-white text-center mt-2">
          Tailwind CSS classes are applied successfully
        </Text>
      </View>
    </View>
  );
}