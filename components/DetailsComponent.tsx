import {Image, StyleSheet, Text, View} from "react-native";
import {FunctionComponent} from "react";
import {useLocalSearchParams} from "expo-router";
import {useGetParticipantById} from "@/data/participants";
import {baselLogo} from '@/utils/images'

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
  },
})

const DetailsComponent: FunctionComponent = () => {
  const {country} = useLocalSearchParams<{country: string}>()
  const {data: participant, error} = useGetParticipantById(country)

  if (!participant) {
    return <Text>Participant not found. Try another one!</Text>
  }

  if (error) {
    return <Text>Something went wrong while loading data.</Text>
  }

  return (
    <View style={styles.container}>
      <Text>Details about: {participant.country}</Text>
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
      <Image style={{width: '50%', height: '50%'}} source={baselLogo} />
    </View>
  )
}

export default DetailsComponent
