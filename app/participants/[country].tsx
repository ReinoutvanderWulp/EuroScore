import {View, Text, StyleSheet, Image} from 'react-native'
import {FunctionComponent} from 'react'
import {useGetParticipantById} from '@/data/participants'
import {useLocalSearchParams} from 'expo-router'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flag: {
    width: 40,
    height: 40,
  },
  container: {
    gap: 15,
  }
})

const Details: FunctionComponent = () => {
  const {country} = useLocalSearchParams<{country: string}>()
  const {data: participant, isLoading} = useGetParticipantById(country)

  if (isLoading){
    return <Text>Loading Participants...</Text>
  }

  if (!participant) {
    return <Text>Participant not found. Try another one.</Text>
  }

  return (
    <View style={styles.container}>
      <Text>Details about {participant.country}</Text>
      <Image source={{uri: participant.flag_url || ''}} style={styles.flag} />
      <View style={styles.row}>
        <View style={styles.row}>
          <Text>Artist: </Text>
          <Text>{participant.artist}</Text>
        </View>
        <View style={styles.row}>
          <Text>Song: </Text>
          <Text>{participant.song}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text>Previous participation: </Text>
          <Text>{participant.returning_artist ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.row}>
          <Text>Number of victories: </Text>
          <Text>{participant.country_wins}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text>Genre: </Text>
          <Text>{participant.genre}</Text>
        </View>
      </View>
      <View>
        <Text>Listen to {participant.song} via Spotify: </Text>
        <Text>{participant.spotify_url}</Text>
      </View>
    </View>
  )
}

export default Details
