import {FunctionComponent} from 'react'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import {router} from 'expo-router'
import {Participant} from '@/interfaces/participants'
import StyledText from '@/components/StyledText'

interface ListItemProps {
  participant: Participant
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  flag: {
    width: 40,
    height: 40,
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
          <Image source={{uri: participant.flag_url}} style={styles.flag} resizeMode="contain" />
        )}
        <StyledText>{participant.country}</StyledText>
      </View>
    </Pressable>
  )
}

export default ParticipantItem