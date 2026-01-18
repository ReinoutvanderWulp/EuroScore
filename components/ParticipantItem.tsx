import {FunctionComponent} from 'react'
import {Participant} from '@/interfaces/participants'
import {Image, Pressable, View, StyleSheet} from 'react-native'
import {router} from 'expo-router'
import StyledText from '@/components/StyledText'

interface ListItemProps {
  participant: Participant
}

const styles = StyleSheet.create({
  flag: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: 'row',
  },
})

const ParticipantItem: FunctionComponent<ListItemProps> = ({participant}) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/participants/[country]',
          params: {country: participant.country},
        })
      }>
      <View style={styles.row}>
        {participant.flag_url && (
          <Image source={{ uri: participant.flag_url }} style={styles.flag} />
        )}
        <StyledText>{participant.country}</StyledText>
      </View>
    </Pressable>
  )
}

export default ParticipantItem
