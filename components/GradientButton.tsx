import {FunctionComponent, ReactNode} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import StyledText from '@/components/StyledText'

interface GradientButtonProps {
  label: string
  onPress: () => void
  icon?: ReactNode
  accessibilityRole?: 'button' | 'link'
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
    borderRadius: 24,
    // Een achtergrondkleur is nodig om op Android een schaduw te tonen
    backgroundColor: '#008000',
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  pressed: {
    opacity: 0.85,
    transform: [{scale: 0.98}],
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  label: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
})

const GradientButton: FunctionComponent<GradientButtonProps> = ({
  label,
  onPress,
  icon,
  accessibilityRole = 'button',
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={label}>
      <LinearGradient
        colors={['#ff0000', '#008000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        {icon}
        <StyledText style={styles.label}>{label}</StyledText>
      </LinearGradient>
    </Pressable>
  )
}

export default GradientButton