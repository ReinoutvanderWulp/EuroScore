import {FunctionComponent} from "react";
import {Linking, Pressable, StyleSheet} from 'react-native'
import StyledText from '@/components/StyledText'

interface LinkButtonProps {
    url: string | null
    songName: string
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({url, songName}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'white',
      color: '#ff0000',
      justifyContent: 'center',
      borderRadius: 20,
    }
  })

  if (!url){
        return (
            <StyledText>No spotify link available</StyledText>
        )
    }

    return (
        <Pressable onPress={() => Linking.openURL(url)} style={styles.button}>
            <StyledText>Listen to {songName}</StyledText>
        </Pressable>
    )
}

export default LinkButton
