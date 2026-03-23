import { Platform } from 'react-native';

/**
 * Backend API base URL.
 * Set EXPO_PUBLIC_API_URL in .env to override (e.g. for physical device: http://192.168.1.x:8787).
 * - iOS Simulator / Web: localhost works
 * - Android Emulator: 10.0.2.2 to reach host machine
 * - Physical device: use your computer's LAN IP
 */
const getApiUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  if (__DEV__) {
    return Platform.select({
      android: 'http://10.0.2.2:8787',
      default: 'http://localhost:8787',
    });
  }
  return 'https://your-api.workers.dev';
};

export const API_URL = getApiUrl();
