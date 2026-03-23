import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Request notification permissions.
 * Returns the permission status.
 */
export async function requestPermissions(): Promise<Notifications.PermissionStatus> {
  if (!Device.isDevice) {
    return 'undetermined';
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === 'granted') {
    return existingStatus;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status;
}

/**
 * Get the Expo push token for the current device.
 * Works with Expo Go and EAS development/production builds.
 */
export async function getExpoPushTokenAsync(): Promise<string | null> {
  try {
    const config = process.env.EXPO_PUBLIC_EAS_PROJECT_ID
      ? { projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID }
      : undefined;
    const token = await Notifications.getExpoPushTokenAsync(config);
    return token.data;
  } catch {
    return null;
  }
}

/**
 * Configure notification handlers for when app is foregrounded.
 */
export function setNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

/**
 * Register for push notifications and return the token.
 * Returns null on web, simulator, or if permission denied.
 */
export async function registerForPushNotifications(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  if (!Device.isDevice) {
    return null;
  }

  setNotificationHandler();

  const status = await requestPermissions();
  if (status !== 'granted') {
    return null;
  }

  return getExpoPushTokenAsync();
}
