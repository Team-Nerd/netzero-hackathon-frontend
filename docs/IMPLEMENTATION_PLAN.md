# EcoDrive Coach - Implementation Plan

## Overview

This document outlines the phased implementation approach for the EcoDrive Coach app. Each phase will be developed in its own feature branch and merged to main upon completion.

**Total Timeline**: 8-12 hours  
**Approach**: Feature branches → Pull Requests → Merge to main

---

## Phase 0: Project Setup & Configuration ✅
**Branch**: `feature/project-setup`  
**Duration**: 30-45 minutes  
**Priority**: Critical Foundation
**Status**: COMPLETED

### Tasks:
1. **Install Core Dependencies**
   - [x] Install Expo dependencies: `expo-sensors`, `expo-keep-awake`, `expo-haptics`, `@react-native-async-storage/async-storage`
   - [x] Install UI framework: `nativewind` and `tailwindcss`
   - [x] Install navigation: `@react-native-kakao/core`, `@react-native-kakao/navi`
   - [x] Install utilities: `axios` for API calls

2. **Configure NativeWind**
   - [x] Create `tailwind.config.js` with proper content paths
   - [x] Update `babel.config.js` to include NativeWind plugin
   - [x] Create global styles file if needed
   - [x] Create `metro.config.js` for NativeWind v4

3. **Project Structure Setup**
   - [x] Create folder structure: `services/`, `hooks/`, `types/`, `utils/`
   - [x] Clean up unused Expo starter files
   - [x] Update `app.json` with app metadata

4. **TypeScript Configuration**
   - [x] Create type definitions for trip data, sensor data
   - [x] Set up interfaces for core data models

### Deliverables:
- ✅ Working project with all dependencies installed
- ✅ NativeWind configured and tested with a simple component
- ✅ Clean project structure ready for development

---

## Phase 1: Core Sensor Monitoring
**Branch**: `feature/sensor-monitoring`  
**Duration**: 2-3 hours  
**Priority**: Core Feature #1

### Tasks:
1. **Sensor Service Implementation**
   - [ ] Create `services/SensorService.ts` with accelerometer logic
   - [ ] Implement `useSensorMonitoring` hook with harsh event detection
   - [ ] Set up 100ms update interval for real-time monitoring
   - [ ] Define HARSH_THRESHOLD constant (2.5 m/s²)

2. **Data Models**
   - [ ] Create `types/index.ts` with HarshEvent, TripData interfaces
   - [ ] Implement eco score calculation logic
   - [ ] Add trip state management (active/inactive)

3. **Basic UI for Testing**
   - [ ] Create simple test screen to display sensor values
   - [ ] Add start/stop monitoring buttons
   - [ ] Display real-time acceleration data
   - [ ] Show harsh event detection alerts

4. **Haptic Feedback**
   - [ ] Integrate expo-haptics for harsh event notifications
   - [ ] Test vibration patterns on real device

### Deliverables:
- Working sensor monitoring that detects harsh events
- Real-time data display for debugging
- Haptic feedback on harsh events
- Eco score calculation logic

---

## Phase 2: Main Driving Screen UI
**Branch**: `feature/driving-screen`  
**Duration**: 2-3 hours  
**Priority**: Core UI

### Tasks:
1. **Replace Tab Navigation**
   - [ ] Remove tab-based navigation from starter template
   - [ ] Create single-screen architecture
   - [ ] Update `app/_layout.tsx` for single screen

2. **DrivingScreen Component**
   - [ ] Create `app/DrivingScreen.tsx` with NativeWind styling
   - [ ] Implement full-screen layout with overlay structure
   - [ ] Add trip control buttons (Start/End Trip)
   - [ ] Style with Tailwind classes for rapid development

3. **Coaching Overlay**
   - [ ] Create semi-transparent overlay for real-time feedback
   - [ ] Add eco score badge (top-right)
   - [ ] Add trip timer display (top-left)
   - [ ] Implement harsh event alert animation

4. **Visual Feedback System**
   - [ ] Red flash overlay for harsh events
   - [ ] Smooth transitions and animations
   - [ ] Clear visual hierarchy

### Deliverables:
- Complete driving screen UI with NativeWind styling
- Working overlay system for coaching feedback
- Smooth animations and visual feedback
- Clean, professional appearance

---

## Phase 3: Local Data Persistence
**Branch**: `feature/local-storage`  
**Duration**: 2 hours  
**Priority**: Demo Critical

### Tasks:
1. **DataService Implementation**
   - [ ] Create `services/DataService.ts` with AsyncStorage integration
   - [ ] Implement `saveTripLocally()` method
   - [ ] Implement `getLocalTrips()` method
   - [ ] Add trip history management (keep last 10 trips)

2. **Trip Summary Logic**
   - [ ] Calculate trip duration
   - [ ] Count total harsh events
   - [ ] Calculate final eco score
   - [ ] Generate fuel saved estimate

3. **User Stats Tracking**
   - [ ] Track total trips completed
   - [ ] Store best eco score
   - [ ] Calculate total CO2 saved
   - [ ] Persist user settings

4. **Trip Summary Modal**
   - [ ] Create `components/TripSummaryModal.tsx`
   - [ ] Display trip stats with NativeWind styling
   - [ ] Add "Save Trip" functionality
   - [ ] Show success feedback

### Deliverables:
- Working local storage for trips
- Trip history persistence
- User statistics tracking
- Trip summary display

---

## Phase 4: Navigation Integration
**Branch**: `feature/kakao-navigation`  
**Duration**: 1-2 hours  
**Priority**: Nice to Have

### Tasks:
1. **Kakao SDK Setup**
   - [ ] Configure Kakao native app key in `app.json`
   - [ ] Set up iOS-specific configurations
   - [ ] Test Kakao SDK initialization

2. **Navigation Integration**
   - [ ] Integrate KakaoNavigation component
   - [ ] Add destination search functionality
   - [ ] Ensure eco-coaching stays active during navigation
   - [ ] Handle navigation state changes

3. **UI Integration**
   - [ ] Place navigation view as base layer
   - [ ] Ensure coaching overlay appears above navigation
   - [ ] Test overlay visibility and interactions

### Deliverables:
- Working Kakao navigation integration
- Coaching overlay functional during navigation
- Seamless UI integration

---

## Phase 5: Polish & Demo Preparation
**Branch**: `feature/polish`  
**Duration**: 1-2 hours  
**Priority**: Demo Enhancement

### Tasks:
1. **UI Polish**
   - [ ] Refine colors and typography
   - [ ] Add loading states
   - [ ] Improve animation smoothness
   - [ ] Ensure consistent styling

2. **Trip History View**
   - [ ] Create simple trip history display
   - [ ] Show last 10 trips with eco scores
   - [ ] Add ability to view trip details

3. **Demo Flow Optimization**
   - [ ] Add demo mode with simulated harsh events
   - [ ] Ensure smooth app launch
   - [ ] Test all features on real device
   - [ ] Prepare demo script

4. **Error Handling**
   - [ ] Add try-catch blocks for critical operations
   - [ ] Handle sensor permission denials
   - [ ] Graceful fallbacks for missing features

### Deliverables:
- Polished, demo-ready application
- Smooth user experience
- Working trip history
- Reliable performance

---

## Phase 6: Backend Integration (Optional)
**Branch**: `feature/backend-sync`  
**Duration**: 2-3 hours  
**Priority**: Optional Enhancement

### Tasks:
1. **API Integration**
   - [ ] Update DataService with backend sync methods
   - [ ] Implement non-blocking sync logic
   - [ ] Add retry mechanism for failed syncs

2. **Social Features**
   - [ ] Add share functionality for achievements
   - [ ] Implement leaderboard API calls
   - [ ] Create community features UI

3. **Sync Status UI**
   - [ ] Add sync status indicators
   - [ ] Show offline/online mode
   - [ ] Display sync errors gracefully

### Deliverables:
- Backend sync functionality
- Social sharing features
- Community leaderboard

---

## Git Workflow

### Branch Naming Convention:
- `feature/[phase-name]` - Feature branches
- `fix/[issue-name]` - Bug fix branches
- `hotfix/[urgent-fix]` - Critical fixes

### Commit Message Format:
```
feat: Add sensor monitoring service
fix: Correct eco score calculation
style: Update driving screen layout
docs: Update implementation plan
```

### Pull Request Process:
1. Create feature branch from main
2. Implement features with regular commits
3. Test thoroughly on real device
4. Create PR with description of changes
5. Review and merge to main
6. Delete feature branch

---

## Success Metrics

### Each Phase Completion Criteria:
- [ ] All tasks completed
- [ ] Features tested on real iOS device
- [ ] No critical bugs or crashes
- [ ] Code follows project conventions
- [ ] Branch merged to main

### Demo Readiness Checklist:
- [ ] App launches without crashes
- [ ] Sensor monitoring works reliably
- [ ] UI is responsive and smooth
- [ ] Data persists between app restarts
- [ ] Demo flow is rehearsed
- [ ] Fallback plan for any failures

---

## Risk Mitigation

### Potential Issues & Solutions:

1. **Sensor Permissions Denied**
   - Solution: Graceful error message, demo mode with simulated data

2. **Kakao Navigation Issues**
   - Solution: Mock navigation view as fallback

3. **Performance Problems**
   - Solution: Reduce sensor update frequency, optimize renders

4. **Backend Not Ready**
   - Solution: Focus on local features, prepare mock data

5. **Time Constraints**
   - Solution: Prioritize Phases 0-3, skip optional phases

---

## Notes

- Always test on real device for sensor features
- Keep commits small and focused
- Document any deviations from plan
- Prioritize working demo over perfect code
- Have fun and stay focused on core value proposition!