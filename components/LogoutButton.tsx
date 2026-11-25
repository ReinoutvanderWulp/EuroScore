import {FunctionComponent, useState} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {router} from 'expo-router'
import {Settings} from 'lucide-react-native'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet'
import {Text} from '@/components/ui/text'
import {useAuth} from '@/context/AuthContext'

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
})

const LogoutButton: FunctionComponent = () => {
  const {user, logOut} = useAuth()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.button} hitSlop={8} accessibilityLabel="Account">
        <Settings size={22} color="#ffffff" />
      </Pressable>

      <Actionsheet isOpen={open} onClose={close}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Text size="sm" className="py-2 text-black">
            {user?.email}
          </Text>
          <ActionsheetItem
            onPress={() => {
              close()
              void logOut()
            }}>
            <ActionsheetItemText className="text-black">Sign out</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => {
              close()
              router.push('/delete-account')
            }}>
            <ActionsheetItemText className="text-black">Delete account</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}

export default LogoutButton