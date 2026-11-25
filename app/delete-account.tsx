import {FunctionComponent, useState} from 'react'
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native'
import {TriangleAlert} from 'lucide-react-native'
import {Alert, AlertIcon, AlertText} from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
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
import {Text} from '@/components/ui/text'
import {VStack} from '@/components/ui/vstack'
import {useAuth} from '@/context/AuthContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const canSubmit = password.length > 0 && !busy

  const runDelete = async () => {
    setConfirmOpen(false)
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <VStack space="lg">
          <Heading size="xl" className="text-black">
            Delete your account
          </Heading>

          <Alert action="error" variant="outline" className="items-start gap-3">
            <AlertIcon as={TriangleAlert} size="lg" />
            <AlertText className="flex-1 text-black">
              This permanently deletes the account {user?.email} and all your scores. This cannot be undone.
            </AlertText>
          </Alert>

          <FormControl isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText className="text-black">Enter your password to confirm</FormControlLabelText>
            </FormControlLabel>
            <Input size="lg" className="rounded-xl">
              <InputField
                className="text-black"
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

          <Button
            action="negative"
            size="lg"
            className="rounded-full"
            isDisabled={!canSubmit}
            onPress={() => setConfirmOpen(true)}>
            {busy ? <ButtonSpinner color="#ffffff" /> : <ButtonText>Delete my account permanently</ButtonText>}
          </Button>
        </VStack>
      </ScrollView>

      <AlertDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="md" className="text-black">
              Delete account?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mb-4 mt-3">
            <Text size="sm" className="text-black">
              This permanently deletes your account and all your scores. This cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="gap-3">
            <Button variant="outline" action="secondary" size="sm" onPress={() => setConfirmOpen(false)}>
              <ButtonText className="text-black">Cancel</ButtonText>
            </Button>
            <Button action="negative" size="sm" onPress={() => void runDelete()}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </KeyboardAvoidingView>
  )
}

export default DeleteAccount