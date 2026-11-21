import {FunctionComponent, useState} from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import StyledText from '@/components/StyledText'
import StyledTitle from '@/components/StyledTitle'
import {useAuth} from '@/context/AuthContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
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
    backgroundColor: '#b00020',
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
    Alert.alert(
      'Delete account',
      'This permanently deletes your account and all your scores. This cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: () => void runDelete()},
      ],
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <StyledTitle>Delete your account</StyledTitle>
        <StyledText>
          This permanently deletes the account {user?.email} and all your scores. Enter your password to
          confirm.
        </StyledText>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888888"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
          value={password}
          onChangeText={setPassword}
        />

        {error && <StyledText style={styles.error}>{error}</StyledText>}

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          disabled={!canSubmit}
          onPress={confirmDelete}>
          {busy ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <StyledText style={styles.buttonText}>Delete my account permanently</StyledText>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default DeleteAccount