import {FunctionComponent} from 'react'
import {Alert, Pressable, StyleSheet} from 'react-native'
import {LogOut} from 'lucide-react-native'
import {useAuth} from '@/context/AuthContext'

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
})

const LogoutButton: FunctionComponent = () => {
  const {logOut} = useAuth()

  const confirmLogOut = () => {
    Alert.alert('Sign out', 'Do you want to sign out of EuroScore?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Sign out', style: 'destructive', onPress: () => void logOut()},
    ])
  }

  return (
    <Pressable onPress={confirmLogOut} style={styles.button} hitSlop={8} accessibilityLabel="Sign out">
      <LogOut size={22} color="#ffffff" />
    </Pressable>
  )
}

export default LogoutButton