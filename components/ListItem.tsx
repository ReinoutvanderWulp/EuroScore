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

const ListItem: FunctionComponent<ListItemProps> = ({participant}) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/participants/[country]',
          params: {country: participant.country},
        })
      }>
      <View style={styles.row}>
        <Image source={{uri: participant.flag_url || ''}} style={styles.flag} />
        <Text>{participant.country}</Text>
      </View>
    </Pressable>
  )
}

export default ListItem
