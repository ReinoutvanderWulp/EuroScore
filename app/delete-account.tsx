import {FunctionComponent, useState} from 'react'
import {Alert as NativeAlert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native'
import {TriangleAlert} from 'lucide-react-native'
import {Alert, AlertIcon, AlertText} from '@/components/ui/alert'
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import {Heading} from '@/components/ui/heading'
import {Input, InputField} from '@/components/ui/input'
import {VStack} from '@/components/ui/vstack'
import {useAuth} from '@/context/AuthContext'
import {useThemeColors} from '@/hooks/useThemeColors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
})

const errorMessage = (error: unknown): string => {
  const code = (error as {code?: string})?.code
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'No connection. Please check your internet.'
    case 'auth/requires-recent-login':
      return 'Please sign out, sign in again and retry.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

const DeleteAccount: FunctionComponent = () => {
  const {user, deleteAccount} = useAuth()
  const colors = useThemeColors()
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = password.length > 0 && !busy

  const runDelete = async () => {
    setBusy(true)
    setError(null)
    try {
      await deleteAccount(password)
      // Na het verwijderen wordt user null: de guard in _layout brengt je naar het loginscherm
    } catch (e) {
      setError(errorMessage(e))
      setBusy(false)
    }
  }

  const confirmDelete = () => {
    NativeAlert.alert(
      'Delete account?',
      'This permanently deletes your account and all your scores. This cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: () => void runDelete()},
      ],
    )
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <VStack space="lg">
          <Heading size="xl" className="text-typography-900">
            Delete your account
          </Heading>

          <Alert action="error" variant="outline" className="items-start gap-3">
            <AlertIcon as={TriangleAlert} size="lg" />
            <AlertText className="flex-1 text-typography-900">
              This permanently deletes the account {user?.email} and all your scores. This cannot be undone.
            </AlertText>
          </Alert>

          <FormControl isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText className="text-typography-900">
                Enter your password to confirm
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="lg" className="rounded-xl">
              <InputField
                className="text-typography-900"
                type="password"
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{error}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button action="negative" size="lg" className="rounded-full" isDisabled={!canSubmit} onPress={confirmDelete}>
            {busy ? <ButtonSpinner color="#ffffff" /> : <ButtonText>Delete my account permanently</ButtonText>}
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default DeleteAccount