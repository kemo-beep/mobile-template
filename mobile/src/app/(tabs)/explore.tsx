import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { apiKeys, getMe, updateProfile } from '@/lib/api';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [editDisplayName, setEditDisplayName] = useState('');

  const { data: me, isLoading } = useQuery({
    queryKey: apiKeys.me,
    queryFn: ({ signal }) => getMe(signal),
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(apiKeys.me, (prev: typeof me) =>
        prev ? { ...prev, profile } : prev
      );
    },
  });

  useEffect(() => {
    if (me) {
      setEditDisplayName(me.profile?.displayName ?? me.user.name ?? '');
    }
  }, [me?.user.id]);

  const handleSaveProfile = () => {
    if (!editDisplayName.trim()) return;
    updateMutation.mutate({ displayName: editDisplayName.trim() });
  };
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          {isLoading ? (
            <ActivityIndicator style={styles.profileLoader} color={theme.text} />
          ) : me ? (
            <ThemedView type="backgroundElement" style={styles.profileCard}>
              <ThemedText type="smallBold">Your profile</ThemedText>
              <TextInput
                style={[
                  styles.profileInput,
                  {
                    color: theme.text,
                    borderColor: theme.textSecondary,
                    backgroundColor: theme.backgroundElement,
                  },
                ]}
                placeholder="Display name"
                placeholderTextColor={theme.textSecondary}
                value={editDisplayName}
                onChangeText={setEditDisplayName}
              />
              <Pressable
                style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
                onPress={handleSaveProfile}
                disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <ThemedText style={styles.saveButtonText}>Save profile</ThemedText>
                )}
              </Pressable>
            </ThemedView>
          ) : null}

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <ThemedText type="small">
              This app has two screens: <ThemedText type="code">src/app/(tabs)/index.tsx</ThemedText>{' '}
              and <ThemedText type="code">src/app/(tabs)/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              The layout file in <ThemedText type="code">src/app/(tabs)/_layout.tsx</ThemedText> sets
              up the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="small">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Images">
            <ThemedText type="small">
              For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
              <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
              screen densities.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what the
              user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="small">
              This template includes an example of an animated component. The{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              the powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  profileLoader: {
    marginVertical: Spacing.three,
  },
  profileCard: {
    marginTop: Spacing.four,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  profileInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#208AEF',
    paddingVertical: Spacing.two,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
