import {FunctionComponent, ReactNode} from 'react'
import {Modal, Pressable, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useThemeColors} from '@/hooks/useThemeColors'

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
})

// Eigen menu op basis van de standaard Modal van React Native. Werkt betrouwbaar op Android en iOS.
const BottomSheet: FunctionComponent<BottomSheetProps> = ({visible, onClose, children}) => {
  const {bottom} = useSafeAreaInsets()
  const colors = useThemeColors()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close" />
        <View style={[styles.sheet, {backgroundColor: colors.background, paddingBottom: bottom + 20}]}>
          <View style={[styles.handle, {backgroundColor: colors.border}]} />
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default BottomSheet