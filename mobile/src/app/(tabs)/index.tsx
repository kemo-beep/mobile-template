import { useQuery } from '@tanstack/react-query';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authClient } from '@/lib/auth-client';
import { apiKeys, getMe } from '@/lib/api';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { data: me, isLoading, error } = useQuery({
    queryKey: apiKeys.me,
    queryFn: ({ signal }) => getMe(signal),
  });

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace('/sign-in');
  };

  const displayName =
    me?.profile?.displayName ?? me?.user?.name ?? me?.user?.email ?? 'there';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          {isLoading ? (
            <ActivityIndicator style={styles.loader} color={theme.text} />
          ) : error ? (
            <ThemedText type="small" themeColor="textSecondary">
              {error instanceof Error ? error.message : 'Failed to load'}
            </ThemedText>
          ) : (
            <ThemedText type="title" style={styles.title}>
              Hello, {displayName}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/(tabs)/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        <Pressable
          style={({ pressed }) => [styles.signOut, pressed && styles.signOutPressed]}
          onPress={handleSignOut}>
          <ThemedText type="linkPrimary">Sign out</ThemedText>
        </Pressable>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  loader: {
    marginVertical: Spacing.two,
  },
  signOut: {
    marginTop: Spacing.four,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    alignSelf: 'center',
  },
  signOutPressed: {
    opacity: 0.7,
  },
});
