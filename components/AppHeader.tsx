import {FunctionComponent} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {ChevronLeft} from 'lucide-react-native'
import GradientStyle from '@/components/GradientStyle'
import LogoutButton from '@/components/LogoutButton'

// Hoogte van de balk onder de statusbalk. Gelijk voor alle schermen.
const HEADER_CONTENT_HEIGHT = 56

interface AppHeaderProps {
  title: string
  onBack?: () => void
  showAccountButton?: boolean
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: HEADER_CONTENT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 16,
  },
  title: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

const AppHeader: FunctionComponent<AppHeaderProps> = ({title, onBack, showAccountButton = true}) => {
  const {top} = useSafeAreaInsets()

  return (
    <View style={{height: top + HEADER_CONTENT_HEIGHT, paddingTop: top}}>
      <GradientStyle topPosition={true} />
      <View style={styles.content}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backButton} hitSlop={8} accessibilityLabel="Go back">
            <ChevronLeft size={26} color="#ffffff" />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {showAccountButton && <LogoutButton />}
      </View>
    </View>
  )
}

export default AppHeader