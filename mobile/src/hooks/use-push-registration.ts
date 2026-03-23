import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

import { registerDevice } from '@/lib/api';
import { apiKeys } from '@/lib/api';
import { registerForPushNotifications } from '@/lib/push-notifications';

/**
 * Registers the device for push notifications when the user is signed in.
 * Runs once per session; updates the backend with the push token.
 */
export function usePushRegistration(session: { user: { id: string } } | null) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const hasRegistered = useRef(false);

  const registerMutation = useMutation({
    mutationFn: async () => {
      const token = await registerForPushNotifications();
      if (!token) return null;

      const platform = Platform.OS === 'ios' ? 'ios' : 'android';
      const { device } = await registerDevice({ platform, pushToken: token });
      return device;
    },
    onSuccess: (device) => {
      if (device) {
        queryClient.invalidateQueries({ queryKey: apiKeys.devices });
      }
    },
  });

  useEffect(() => {
    if (Platform.OS === 'web' || !session || hasRegistered.current) {
      return;
    }

    hasRegistered.current = true;
    registerMutation.mutate();
  }, [session?.user?.id]);

  // Listen for notification tap (e.g. deep link)
  useEffect(() => {
    if (Platform.OS === 'web') return;

    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as Record<string, unknown> | undefined;
      if (data?.url && typeof data.url === 'string') {
        router.push(data.url as Parameters<typeof router.push>[0]);
      }
    });

    return () => sub.remove();
  }, [router]);
}
