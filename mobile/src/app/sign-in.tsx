import { authClient } from '@/lib/auth-client';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SignInScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      Alert.alert('Sign in failed', error.message ?? 'Please check your credentials');
      return;
    }
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}>
          <ThemedText type="title" style={styles.title}>
            Sign in
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            Sign in to your account to continue
          </ThemedText>

          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }]}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            editable={!loading}
          />
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }]}
            placeholder="Password"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            editable={!loading}
          />

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleSignIn}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.buttonText}>Sign in</ThemedText>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
            onPress={() => router.push('/sign-up')}
            disabled={loading}>
            <ThemedText type="link">
              Don&apos;t have an account? <ThemedText type="linkPrimary">Sign up</ThemedText>
            </ThemedText>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.five,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.three,
    fontSize: 16,
  },
  button: {
    height: 48,
    backgroundColor: '#208AEF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: Spacing.four,
    alignItems: 'center',
  },
  linkPressed: {
    opacity: 0.7,
  },
});
