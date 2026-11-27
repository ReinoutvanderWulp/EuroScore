import {FunctionComponent, useState} from 'react'
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Eye, EyeOff} from 'lucide-react-native'
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import {Heading} from '@/components/ui/heading'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {Text} from '@/components/ui/text'
import {VStack} from '@/components/ui/vstack'
import {useAuth} from '@/context/AuthContext'
import {useThemeColors} from '@/hooks/useThemeColors'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
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
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const colors = useThemeColors()

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
    <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.background}]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <VStack space="xl">
            <VStack space="xs">
              <Heading size="3xl" className="text-typography-900">
                EuroScore
              </Heading>
              <Text size="md" className="text-typography-900">
                {isSignUp ? 'Create your account to start scoring.' : 'Welcome back! Sign in to continue.'}
              </Text>
            </VStack>

            <VStack space="lg">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText className="text-typography-900">Email</FormControlLabelText>
                </FormControlLabel>
                <Input size="lg" className="rounded-xl">
                  <InputField
                    className="text-typography-900"
                    placeholder="you@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </Input>
              </FormControl>

              <FormControl isInvalid={!!error}>
                <FormControlLabel>
                  <FormControlLabelText className="text-typography-900">Password</FormControlLabelText>
                </FormControlLabel>
                <Input size="lg" className="rounded-xl">
                  <InputField
                    className="text-typography-900"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={submit}
                  />
                  <InputSlot className="pr-4" onPress={() => setShowPassword(prev => !prev)}>
                    <InputIcon as={showPassword ? EyeOff : Eye} className="text-typography-900" />
                  </InputSlot>
                </Input>
                <FormControlError>
                  <FormControlErrorText>{error}</FormControlErrorText>
                </FormControlError>
              </FormControl>

              {info && (
                <Text size="sm" className="text-typography-900">
                  {info}
                </Text>
              )}
            </VStack>

            <VStack space="sm">
              <Button size="lg" className="rounded-full" isDisabled={!canSubmit} onPress={submit}>
                {busy ? <ButtonSpinner color="#ffffff" /> : <ButtonText>{isSignUp ? 'Sign up' : 'Sign in'}</ButtonText>}
              </Button>

              {!isSignUp && (
                <Button variant="link" action="secondary" isDisabled={busy} onPress={forgotPassword}>
                  <ButtonText className="text-typography-900 underline">Forgot your password?</ButtonText>
                </Button>
              )}

              <Button
                variant="link"
                action="secondary"
                onPress={() => {
                  setIsSignUp(prev => !prev)
                  setError(null)
                  setInfo(null)
                }}>
                <ButtonText className="text-typography-900 underline">
                  {isSignUp ? 'Already have an account? Sign in' : 'No account yet? Sign up'}
                </ButtonText>
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login