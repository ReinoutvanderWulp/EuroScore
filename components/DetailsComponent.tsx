import {Image, StyleSheet, View} from "react-native";
import {FunctionComponent} from "react";
import {useLocalSearchParams} from "expo-router";
import {useGetParticipantByCountryName} from "@/data/participants";
import LinkButton from '@/components/LinkButton'
import StyledTitle from '@/components/StyledTitle'
import StyledText from '@/components/StyledText'
import Loading from '@/components/Loading'

const styles = StyleSheet.create({
  flag: {
    width: 70,
    height: 70,
  },
  container: {
    gap: 15,
    flex: 1,
  },
  row: {
    flexDirection: "row"
  },
})

const DetailsComponent: FunctionComponent = () => {
  const {country} = useLocalSearchParams<{country: string}>()
  const {data: participant, error, isLoading} = useGetParticipantByCountryName(country)

  if (isLoading) {
    return <Loading loadingText="Loading Participant" />
  }

  if (error) {
    return <StyledText>Error while loading data.</StyledText>
  }

  if (!participant) {
    return <StyledText>Participant not found. Try another one!</StyledText>
  }

  return (
    <View style={styles.container}>
      <StyledTitle>Details about: {participant.country}</StyledTitle>
      <Image source={{uri: participant.flag_url || ''}} style={styles.flag} />
      <View>
        <View style={styles.row}>
          <StyledText>👨‍🎤 Artist: </StyledText>
          <StyledText>{participant.artist}</StyledText>
        </View>
        <View style={styles.row}>
          <StyledText>🎵 Song: </StyledText>
          <StyledText>{participant.song}</StyledText>
        </View>
        <View style={styles.row}>
          <StyledText>🔄 Previous participation: </StyledText>
          <StyledText>{participant.returning_artist ? '✅ Yes' : '❌ No'}</StyledText>
        </View>
        <View style={styles.row}>
          <StyledText>🏆 Number of victories: </StyledText>
          <StyledText>{participant.country_wins}</StyledText>
        </View>
        <View style={styles.row}>
          <StyledText>🎸 Genre: </StyledText>
          <StyledText>{participant.genre}</StyledText>
        </View>
        <View>
          <StyledText>🎧 Listen to the song via Spotify:</StyledText>
          <LinkButton url={participant.spotify_url} songName={participant.song} />
        </View>
      </View>
    </View>
  )
}

export default DetailsComponent
