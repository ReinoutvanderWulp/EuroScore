import {FunctionComponent} from 'react'
import {Participant} from '@/interfaces/participants'
import {Image, Pressable, View, Text, StyleSheet} from 'react-native'
import {router} from 'expo-router'

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
        <Text>{participant.country}</Text>
      </View>
    </Pressable>
  )
}

export default ParticipantItem
