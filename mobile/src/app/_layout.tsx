import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';

import { usePushRegistration } from '@/hooks/use-push-registration';
import { authClient } from '@/lib/auth-client';
import { initSentry } from '@/lib/sentry';

initSentry();
import { QueryProvider } from '@/lib/query-provider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';

  if (isPending) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session && !isAuthRoute) {
    return <Redirect href="/sign-in" />;
  }

  if (session && isAuthRoute) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <QueryProvider>
      {session && <PushRegistrationGate session={session} />}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack>
      </ThemeProvider>
    </QueryProvider>
  );
}

function PushRegistrationGate({
  session,
}: {
  session: { user: { id: string } };
}) {
  usePushRegistration(session);
  return null;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
