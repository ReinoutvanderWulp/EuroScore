import {FunctionComponent} from 'react'
import {Linking} from 'react-native'
import {Music} from 'lucide-react-native'
import GradientButton from '@/components/GradientButton'
import StyledText from '@/components/StyledText'

interface LinkButtonProps {
  url: string | null
  songName: string
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({url, songName}) => {
  if (!url) {
    return <StyledText>No spotify link available</StyledText>
  }

  return (
    <GradientButton
      label={`Listen to ${songName}`}
      icon={<Music size={20} color="#ffffff" />}
      accessibilityRole="link"
      onPress={() => void Linking.openURL(url)}
    />
  )
}

export default LinkButton