import * as Sentry from '@sentry/react-native';

/**
 * Initialize Sentry for crash reporting and performance monitoring.
 * No-op when EXPO_PUBLIC_SENTRY_DSN is not set.
 */
export function initSentry(): void {
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    return;
  }

  try {
    Sentry.init({
      dsn,
      enabled: true,
      environment: __DEV__ ? 'development' : 'production',
      tracesSampleRate: __DEV__ ? 0 : 0.2,
      enableAutoSessionTracking: true,
    });
  } catch {
    // Swallow init errors so a bad config never crashes the app
  }
}
