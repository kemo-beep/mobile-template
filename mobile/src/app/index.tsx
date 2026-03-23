import { Redirect } from 'expo-router';

/**
 * Root index redirects to the main app tabs.
 */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
