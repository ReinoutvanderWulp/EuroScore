import {FunctionComponent} from 'react'
import {Alert, Pressable, StyleSheet} from 'react-native'
import {router} from 'expo-router'
import {Settings} from 'lucide-react-native'
import {useAuth} from '@/context/AuthContext'

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
})

const LogoutButton: FunctionComponent = () => {
  const {user, logOut} = useAuth()

  const openMenu = () => {
    Alert.alert('Account', user?.email ?? undefined, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Sign out', onPress: () => void logOut()},
      {text: 'Delete account', style: 'destructive', onPress: () => router.push('/delete-account')},
    ])
  }

  return (
    <Pressable onPress={openMenu} style={styles.button} hitSlop={8} accessibilityLabel="Account">
      <Settings size={22} color="#ffffff" />
    </Pressable>
  )
}

export default LogoutButton