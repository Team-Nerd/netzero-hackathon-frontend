# EcoDrive Coach - Overnight Hackathon MVP

**Repository**: `netzero-hackathon-frontend`

## 1. Project Scope (Overnight Build)

### Core Mission

**Real-time eco-driving coaching through acceleration monitoring** - Show immediate feedback when drivers brake/accelerate too harshly to improve fuel efficiency and reduce CO2 emissions.

### Target

- **iOS only**
- **Single core feature**: Harsh driving detection + coaching
- **Demo-ready in 8-12 hours**
- **App Name**: EcoDrive Coach
- **Repo Name**: netzero-hackathon-frontend

## 2. MVP Feature Set (3 Core Features Only)

### Feature 1: Real-Time Driving Monitoring

**Primary Goal**: Detect harsh acceleration/braking and give immediate feedback

- Monitor accelerometer sensor data (100ms intervals)
- Detect harsh events (>2.5 m/s² threshold)
- Show real-time feedback overlay on screen
- Simple eco score counter (good events vs harsh events)

### Feature 2: Basic Navigation

**Primary Goal**: Integrate Kakao navigation for Korean roads

- Set destination using Kakao navigation
- Launch Kakao navigation within the app
- Keep eco-coaching active during navigation

### Feature 3: Trip Summary

**Primary Goal**: Show basic results after trip ends

- Trip duration and basic stats
- Count of harsh events detected
- Simple eco score (0-100)
- Estimated fuel saved message

## 3. Hybrid Data Architecture (Local + Backend)

### Data Strategy for Hackathon

**Local Storage**: Core functionality (works offline, demo-safe)
**Backend APIs**: Social features and analytics (when ready)

### Required Dependencies

```bash
# Essential only
expo-sensors          # Accelerometer monitoring
expo-keep-awake       # Keep screen active
@react-native-kakao/navi  # Navigation
expo-haptics          # Vibration feedback
@expo/async-storage   # Local data persistence
axios                 # Backend API calls
nativewind            # Tailwind CSS for React Native
```

### Simplified App Structure

```
App.tsx                    # Single main component
├── DrivingScreen.tsx      # Main screen (navigation + coaching)
├── TripSummaryModal.tsx   # Simple results popup
├── services/
│   ├── DataService.ts     # Local storage + backend sync
│   └── SensorService.ts   # Accelerometer logic
└── constants.ts           # Thresholds only
```

## 6. Hackathon Data Strategy Benefits

### ✅ Demo-Safe Architecture

- **App works immediately** - no waiting for backend APIs
- **Offline resilient** - demo works without internet
- **Independent development** - frontend team not blocked by backend
- **Realistic data** - local storage shows real trip history

### ✅ Scalable for Real Product

- **Backend integration ready** - shows proper API design
- **Data sync strategy** - demonstrates offline-first thinking
- **Community features** - backend enables social sharing
- **Analytics ready** - data structure supports insights

### Implementation Priority

1. **Phase 1**: Local storage only (demo core functionality)
2. **Phase 2**: Add backend sync (if backend team ready)
3. **Phase 3**: Social features (sharing achievements)

### Data Flow Example

```typescript
// Trip completion flow
const completeTripFlow = async (tripData: TripData) => {
  // 1. Always save locally first (demo-critical)
  await DataService.saveTripLocally(tripData);
  
  // 2. Show trip summary immediately
  showTripSummary(tripData);
  
  // 3. Sync to backend in background (non-blocking)
  DataService.syncTripToBackend(tripData)
    .then(() => console.log('Synced to backend'))
    .catch(() => console.log('Will retry sync later'));
};
```

## 4. Data Architecture Strategy

### Local Storage (AsyncStorage) - Core Features

**Why Local**: Demo-safe, no backend dependencies, works offline

```typescript
// Store locally for immediate demo needs
interface LocalData {
  currentTrip: TripData | null;
  tripHistory: TripData[];     // Last 10 trips
  userStats: {
    totalTrips: number;
    bestEcoScore: number;
    totalCO2Saved: number;
  };
  settings: {
    harshThreshold: number;
    coachingEnabled: boolean;
  };
}
```

### Backend APIs - Social Features

**Why Backend**: Sharing, leaderboards, community features

```typescript
// Sync to backend when available (non-blocking)
interface BackendSync {
  POST /api/trips          // Upload trip data
  GET  /api/leaderboard    // Community scores
  POST /api/achievements   // Share accomplishments
  GET  /api/user/stats     // Cross-device analytics
}
```

### Implementation Strategy

```typescript
// services/DataService.ts
export class DataService {
  // Always work locally first
  static async saveTripLocally(trip: TripData): Promise<void> {
    const trips = await AsyncStorage.getItem('tripHistory');
    // Save immediately to local storage
  }
  
  // Sync to backend when available (non-blocking)
  static async syncTripToBackend(trip: TripData): Promise<void> {
    try {
      await axios.post('/api/trips', trip);
      // Mark as synced locally
    } catch (error) {
      // Continue working offline - no demo disruption
      console.log('Will sync later when backend available');
    }
  }
}
```

### Core Data Models (Minimal)

```typescript
// Only essential data
interface HarshEvent {
  timestamp: Date;
  type: 'harsh_braking' | 'harsh_acceleration';
  magnitude: number;
}

interface TripSummary {
  duration: number;        // minutes
  harshEvents: number;     // count
  ecoScore: number;        // 0-100
  fuelSaved: string;       // simple estimate message
}
```

## 5. Single Screen App Architecture

### UI Styling with NativeWind

**Why NativeWind**: 
- Rapid UI development with Tailwind utility classes
- Consistent styling across components
- Responsive design out of the box
- Familiar to web developers

### Main Screen: DrivingScreen.tsx

**Layout**:

- Kakao map takes full screen
- Semi-transparent coaching overlay on top
- Simple start/stop trip buttons

**Real-time Elements**:

- Live eco score badge (top-right)
- Harsh event alerts (center overlay)
- Trip timer (top-left)

### Coaching Feedback (Immediate)

- **Visual**: Red flash overlay for harsh events (styled with NativeWind)
- **Haptic**: Phone vibration
- **Text**: Simple message "Gentler braking saves fuel!"

## 7. Implementation Plan (8-12 Hours)

### Phase 1 (3-4 hours): Local-First Core

```typescript
// 1. Create Expo project with correct repo name
npx create-expo-app netzero-hackathon-frontend

// 2. Install dependencies (local-first)
npx expo install expo-sensors expo-keep-awake expo-haptics @expo/async-storage
npm install @react-native-kakao/core @react-native-kakao/navi axios nativewind
npm install -D tailwindcss

// 3. Configure NativeWind
npx tailwindcss init

// 4. Build core with local storage
// - Sensor monitoring with local trip saving
// - Basic Kakao navigation integration
// - Trip history stored in AsyncStorage
// - UI styled with NativeWind/Tailwind classes
```

### Phase 2 (3-4 hours): UI + Local Features

- Complete DrivingScreen with coaching overlay styled with NativeWind
- Trip summary modal with NativeWind styling
- Basic trip history from AsyncStorage
- Polish UI with Tailwind utility classes for rapid development

### Phase 3 (2-4 hours): Backend Integration (If Ready)

- Add DataService with backend sync
- Implement sharing features
- Add community/social elements
- Fallback gracefully if backend not ready

### Development Priority

**Must-Have (Local)**: Sensor monitoring, trip saving, eco coaching
**Nice-to-Have (Backend)**: Sharing, leaderboards, cross-device sync

## 7. Key Implementation Files

### App.tsx (Main Entry)

```typescript
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrivingScreen from './DrivingScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <DrivingScreen />
    </SafeAreaProvider>
  );
}
```

### DrivingScreen.tsx (Single Main Screen with NativeWind)

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { KeepAwake } from 'expo-keep-awake';
import { useSensorMonitoring } from './useSensorMonitoring';
import { KakaoNavigation } from '@react-native-kakao/navi';

export default function DrivingScreen() {
  const [isTripActive, setIsTripActive] = useState(false);
  const { ecoScore, harshEvents, isHarshEvent } = useSensorMonitoring(isTripActive);

  const startTrip = () => {
    setIsTripActive(true);
    KeepAwake.activateKeepAwake();
  };

  const endTrip = () => {
    setIsTripActive(false);
    KeepAwake.deactivateKeepAwake();
    // Show trip summary
  };

  return (
    <View className="flex-1">
      {/* Kakao Map View */}
      <KakaoNavigation className="flex-1" />
      
      {/* Coaching Overlay */}
      {isTripActive && (
        <View className="absolute top-0 left-0 right-0 p-4 bg-black/50">
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-lg font-semibold">
              Eco Score: {ecoScore}
            </Text>
            <View className="bg-green-500 px-3 py-1 rounded-full">
              <Text className="text-white font-bold">{harshEvents} events</Text>
            </View>
          </View>
          
          {isHarshEvent && (
            <View className="absolute inset-0 bg-red-500/30 items-center justify-center">
              <View className="bg-red-600 px-6 py-3 rounded-lg">
                <Text className="text-white text-xl font-bold">
                  Gentler driving saves fuel! 🌱
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
      
      {/* Trip Controls */}
      <TouchableOpacity 
        onPress={isTripActive ? endTrip : startTrip}
        className={`absolute bottom-8 self-center px-8 py-4 rounded-full ${
          isTripActive ? 'bg-red-500' : 'bg-green-500'
        }`}
      >
        <Text className="text-white text-lg font-bold">
          {isTripActive ? 'End Trip' : 'Start Eco Trip'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### services/DataService.ts (Hybrid Approach)

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BACKEND_URL = 'https://your-backend-api.com'; // When ready

export class DataService {
  // Local storage (always works)
  static async saveTrip(trip: TripData): Promise<void> {
    try {
      const existingTrips = await this.getLocalTrips();
      const updatedTrips = [trip, ...existingTrips.slice(0, 9)]; // Keep 10 most recent
      await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
      
      // Try to sync to backend (non-blocking)
      this.syncTripToBackend(trip);
    } catch (error) {
      console.log('Local save failed:', error);
    }
  }

  static async getLocalTrips(): Promise<TripData[]> {
    try {
      const trips = await AsyncStorage.getItem('trips');
      return trips ? JSON.parse(trips) : [];
    } catch {
      return [];
    }
  }

  // Backend sync (optional, doesn't block demo)
  static async syncTripToBackend(trip: TripData): Promise<void> {
    try {
      await axios.post(`${BACKEND_URL}/api/trips`, trip, {
        timeout: 5000, // Don't wait too long
      });
      console.log('Trip synced to backend');
    } catch (error) {
      console.log('Backend sync failed, will retry later:', error.message);
      // Could implement retry logic here
    }
  }

  // Social features (when backend ready)
  static async getLeaderboard(): Promise<any[]> {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/leaderboard`);
      return response.data;
    } catch {
      // Fallback to local data or empty array
      return [];
    }
  }
}
```

### services/SensorService.ts (Core Logic)

```typescript
import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

const HARSH_THRESHOLD = 2.5; // m/s²

export function useSensorMonitoring(isActive: boolean) {
  const [ecoScore, setEcoScore] = useState(100);
  const [harshEvents, setHarshEvents] = useState(0);
  const [isHarshEvent, setIsHarshEvent] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    Accelerometer.setUpdateInterval(100);
    
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      if (magnitude > HARSH_THRESHOLD) {
        // Harsh event detected
        setHarshEvents(prev => prev + 1);
        setIsHarshEvent(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        
        // Clear alert after 2 seconds
        setTimeout(() => setIsHarshEvent(false), 2000);
        
        // Reduce eco score
        setEcoScore(prev => Math.max(0, prev - 5));
      }
    });

    return () => subscription.remove();
  }, [isActive]);

  return { ecoScore, harshEvents, isHarshEvent };
}
```

```typescript
import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

const HARSH_THRESHOLD = 2.5; // m/s²

export function useSensorMonitoring(isActive: boolean) {
  const [ecoScore, setEcoScore] = useState(100);
  const [harshEvents, setHarshEvents] = useState(0);
  const [isHarshEvent, setIsHarshEvent] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    Accelerometer.setUpdateInterval(100);
    
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      if (magnitude > HARSH_THRESHOLD) {
        // Harsh event detected
        setHarshEvents(prev => prev + 1);
        setIsHarshEvent(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        
        // Clear alert after 2 seconds
        setTimeout(() => setIsHarshEvent(false), 2000);
        
        // Reduce eco score
        setEcoScore(prev => Math.max(0, prev - 5));
      }
    });

    return () => subscription.remove();
  }, [isActive]);

  return { ecoScore, harshEvents, isHarshEvent };
}
```

## 9. Demo Success Criteria

### Core Demo Flow (2-3 minutes)

1. **App Launch**: Show clean driving screen with Kakao map
2. **Trip History**: Show saved trips from local storage (proves persistence)
3. **Start Trip**: Tap button, show eco coaching is active
4. **Simulate Harsh Event**: Shake phone to trigger harsh braking alert
5. **Show Feedback**: Visual alert + haptic feedback + eco score drop
6. **End Trip**: Save to local storage + show summary with eco score
7. **Backend Features**: (If ready) Show sharing or leaderboard features

### Must-Have for Demo (Local Storage)

- ✅ Real accelerometer monitoring works
- ✅ Trip data persists between app restarts
- ✅ Harsh events trigger immediate feedback
- ✅ Kakao navigation integration functional
- ✅ Trip history shows multiple saved trips
- ✅ App doesn't crash during sensor monitoring

### Nice-to-Have (Backend Integration)

- 🔄 Trip data syncs to backend automatically
- 🔄 Sharing achievements to social media
- 🔄 Community leaderboard features
- 🔄 Cross-device trip history

### Data Architecture Demo Points

**For Judges**: "Our app works offline-first for reliability, but syncs to backend for social features - shows both immediate user value and scalable architecture"

## 9. Hackathon Configuration

### NativeWind Setup

**tailwind.config.js**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**babel.config.js** (add NativeWind plugin):
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### app.json (Minimal)

```json
{
  "expo": {
    "name": "EcoDrive Coach",
    "slug": "netzero-hackathon-frontend",
    "platforms": ["ios"],
    "ios": {
      "bundleIdentifier": "com.netzero.ecodrivecoach"
    },
    "plugins": [
      [
        "@react-native-kakao/core",
        {
          "nativeAppKey": "{{KAKAO_NATIVE_APP_KEY}}"
        }
      ]
    ]
  }
}
```

### Development Focus

- **Get it working** > making it pretty
- **Real device testing** essential for sensors
- **Keep it simple** - single screen, core functionality only
- **Demo story** more important than feature completeness

---

**Total Development Time**: 8-12 hours
**Core Value**: Real-time eco-driving coaching through acceleration monitoring
**Demo Message**: "Save fuel and reduce CO2 by driving more smoothly - get immediate feedback when you brake or accelerate too harshly!"
