# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **EcoDrive Coach** app - a React Native Expo application for real-time eco-driving coaching through acceleration monitoring. Built for the NetZero hackathon to help drivers reduce fuel consumption and CO2 emissions through immediate feedback on harsh acceleration/braking events.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Platform-specific starts
npm run ios      # iOS simulator
npm run android  # Android emulator  
npm run web      # Web browser

# Code quality
npm run lint     # Run ESLint checks

# Reset to blank template (removes all starter code)
npm run reset-project
```

## Architecture

### Tech Stack
- **Framework**: React Native with Expo (v53.0.12)
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript with strict mode
- **Styling**: React Native built-in styling with theme support

### Project Structure
- `app/` - File-based routing (Expo Router)
  - `(tabs)/` - Tab navigation screens
  - `_layout.tsx` - Root layout with theme provider
- `components/` - Reusable UI components
  - `ui/` - Core UI components with theme support
- `constants/` - App constants (Colors, theme values)
- `hooks/` - Custom React hooks
- `assets/` - Images and fonts
- `docs/PRD.md` - Product requirements document

### Key Implementation Requirements

Based on the PRD, the app needs to implement:

1. **Real-Time Driving Monitoring**
   - Accelerometer monitoring (100ms intervals)
   - Harsh event detection (>2.5 m/s² threshold)
   - Real-time feedback overlay
   - Eco score tracking

2. **Navigation Integration**
   - Google Navigation SDK for embedded turn-by-turn navigation
   - Eco-coaching overlay displays on top of navigation view
   - No app switching required

3. **Data Architecture**
   - Local-first with AsyncStorage
   - Optional backend sync for social features
   - Trip history and statistics

### Required Dependencies Not Yet Installed

```bash
# Core functionality
expo-sensors              # Accelerometer monitoring
expo-keep-awake          # Keep screen active during trips
@react-native-async-storage/async-storage  # Local data persistence

# Navigation
@googlemaps/react-native-navigation-sdk  # Google embedded navigation

# Backend communication (if needed)
axios                    # API calls
```

### Development Notes

- The app currently has basic Expo starter template with tab navigation
- For the EcoDrive Coach MVP, the tab navigation should be replaced with a single-screen approach
- Theme support (dark/light mode) is already configured
- TypeScript path aliases are set up (`@/*` maps to project root)
- New Architecture is enabled (`newArchEnabled: true` in app.json)
- Typed routes experiment is enabled for better navigation type safety

### Testing

Currently no testing framework is configured. If tests are needed:

- Add Jest and React Native Testing Library
- Configure test scripts in package.json
- Set up test utilities for mocking sensors and navigation

### Platform Support

- Primary target: iOS (hackathon focus)
- Also supports: Android and Web
- Uses platform-specific components when needed (e.g., TabBarBackground for iOS)

## Git Commit Guidelines

- Do not add lines such as "🤖 Generated with [Claude Code](https://claude.ai/code)" or "Co-Authored-By: Claude <noreply@anthropic.com>"
- Use conventional commit format when appropriate
- Keep commit messages concise and descriptive
- Focus on what changes were made and why
