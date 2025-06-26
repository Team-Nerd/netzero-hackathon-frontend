export default {
  expo: {
    name: "EcoDrive Coach",
    slug: "netzero-hackathon-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ecodrivecoach",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    platforms: ["ios", "android"],
    extra: {
      eas: {
        projectId: "d706a8ad-5634-4390-b922-633c216239d9"
      }
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.netzero.ecodrivecoach",
      infoPlist: {
        NSMotionUsageDescription: "EcoDrive Coach uses motion sensors to detect harsh acceleration and braking to help you drive more efficiently.",
        LSApplicationQueriesSchemes: ["kakaonavi-sdk", "kakaokompassauth", "kakaolink"],
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [`kakao${process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || "YOUR_KAKAO_NATIVE_APP_KEY"}`]
          }
        ],
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-dev-client",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: [
              "https://devrepo.kakao.com/nexus/content/groups/public/"
            ]
          }
        }
      ],
      [
        "@react-native-kakao/core",
        {
          nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || "YOUR_KAKAO_NATIVE_APP_KEY",
          ios: {
            naviApplicationQuerySchemes: true
          }
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    }
  }
};