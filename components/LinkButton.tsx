import {FunctionComponent} from "react";
import {Linking, Pressable, StyleSheet, View} from 'react-native'
import StyledText from '@/components/StyledText'
import {Music} from 'lucide-react-native'

interface LinkButtonProps {
    url: string | null
    songName: string
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({url, songName}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    }
  })

  if (!url){
        return (
            <StyledText>No spotify link available</StyledText>
        )
    }

    return (
      <Pressable onPress={() => Linking.openURL(url)} style={styles.button}>
        <View style={styles.buttonContainer}>
          <Music size={20} color="white" />
          <StyledText>Listen to {songName}</StyledText>
        </View>
      </Pressable>
    )
}

export default LinkButton
