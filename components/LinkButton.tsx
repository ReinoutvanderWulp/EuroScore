import {FunctionComponent} from 'react'
import {Linking, Pressable, StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {Music} from 'lucide-react-native'
import StyledText from '@/components/StyledText'

interface LinkButtonProps {
  url: string | null
  songName: string
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

const LinkButton: FunctionComponent<LinkButtonProps> = ({url, songName}) => {
  if (!url) {
    return <StyledText>No spotify link available</StyledText>
  }

  return (
    <Pressable
      onPress={() => void Linking.openURL(url)}
      style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel={`Listen to ${songName}`}>
      <LinearGradient
        colors={['#ff0000', '#008000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        <Music size={20} color="#ffffff" />
        <StyledText style={styles.label}>Listen to {songName}</StyledText>
      </LinearGradient>
    </Pressable>
  )
}

export default LinkButton