import {Image, StyleSheet, Text, View} from "react-native";
import {FunctionComponent} from "react";
import {useLocalSearchParams} from "expo-router";
import {useGetParticipantById} from "@/data/participants";
import {baselLogo} from '@/utils/images'
import LinkButton from '@/components/LinkButton'

const styles = StyleSheet.create({
  flag: {
    width: 80,
    height: 80,
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
      <View>
        <Text>👨‍🎤 Artist: </Text>
        <Text>{participant.artist}</Text>
        <Text>🎵 Song: </Text>
        <Text>{participant.song}</Text>
        <Text>🔄 Previous participation: </Text>
        <Text>{participant.returning_artist ? '✅ Yes' : '❌ No'}</Text>
        <Text>🏆 Number of victories: </Text>
        <Text>{participant.country_wins}</Text>
        <Text>🎸 Genre: </Text>
        <Text>{participant.genre}</Text>
        <Text>🎧 Listen to the song via Spotify:</Text>
        <LinkButton url={participant.spotify_url} songName={participant.song} />
      </View>
      <Image style={{width: '50%', height: '50%'}} source={baselLogo} />
    </View>
  )
}

export default DetailsComponent
