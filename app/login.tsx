import {FunctionComponent, useState} from 'react'
import {ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import StyledText from '@/components/StyledText'
import StyledTitle from '@/components/StyledTitle'
import {useAuth} from '@/context/AuthContext'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#008000',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  error: {
    color: '#b00020',
  },
  switchText: {
    textAlign: 'center',
    color: '#008000',
  },
})

const errorMessage = (error: unknown): string => {
  const code = (error as {code?: string})?.code
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'This email address is already registered.'
    case 'auth/weak-password':
      return 'Your password should be at least 6 characters.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'No connection. Please check your internet.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

const Login: FunctionComponent = () => {
  const {signIn, signUp, resetPassword} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  const canSubmit = email.trim().length > 0 && password.length > 0 && !busy

  const submit = async () => {
    setBusy(true)
    setError(null)
    setInfo(null)
    try {
      // Na gelukt inloggen schakelt de Stack.Protected-guard in _layout automatisch naar de tabs
      if (isSignUp) {
        await signUp(email.trim(), password)
      } else {
        await signIn(email.trim(), password)
      }
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  const forgotPassword = async () => {
    if (email.trim().length === 0) {
      setError('Enter your email address first.')
      return
    }
    setBusy(true)
    setError(null)
    setInfo(null)
    try {
      await resetPassword(email.trim())
      // Bewust neutraal: we verklappen niet of een account bestaat
      setInfo('If an account exists for this email address, we sent a link to reset your password.')
    } catch (e) {
      setError(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StyledTitle>{isSignUp ? 'Create your EuroScore account' : 'Welcome back to EuroScore'}</StyledTitle>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888888"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888888"
          secureTextEntry
          autoCapitalize="none"
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={submit}
        />

        {error && <StyledText style={styles.error}>{error}</StyledText>}
        {info && <StyledText>{info}</StyledText>}

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          disabled={!canSubmit}
          onPress={submit}>
          {busy ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <StyledText style={styles.buttonText}>{isSignUp ? 'Sign up' : 'Sign in'}</StyledText>
          )}
        </Pressable>

        {!isSignUp && (
          <Pressable onPress={forgotPassword} disabled={busy}>
            <StyledText style={styles.switchText}>Forgot your password?</StyledText>
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            setIsSignUp(prev => !prev)
            setError(null)
            setInfo(null)
          }}>
          <View>
            <StyledText style={styles.switchText}>
              {isSignUp ? 'Already have an account? Sign in' : 'No account yet? Sign up'}
            </StyledText>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login