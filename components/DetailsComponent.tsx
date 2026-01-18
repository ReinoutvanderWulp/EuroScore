import {Image, StyleSheet, View} from "react-native";
import {FunctionComponent} from "react";
import {useLocalSearchParams} from "expo-router";
import {useGetParticipantById} from "@/data/participants";
import {baselLogo} from '@/utils/images'
import LinkButton from '@/components/LinkButton'
import StyledTitle from '@/components/StyledTitle'
import StyledText from '@/components/StyledText'

const styles = StyleSheet.create({
  flag: {
    width: 80,
    height: 80,
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
  const {data: participant, error} = useGetParticipantById(country)

  if (!participant) {
    return <StyledText>Participant not found. Try another one!</StyledText>
  }

  if (error) {
    return <StyledText>Something went wrong while loading data.</StyledText>
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
        <View>
          <StyledText>🎵 Song: </StyledText>
          <StyledText>{participant.song}</StyledText>
        </View>
        <View>
          <StyledText>🔄 Previous participation: </StyledText>
          <StyledText>{participant.returning_artist ? '✅ Yes' : '❌ No'}</StyledText>
        </View>
        <View>
          <StyledText>🏆 Number of victories: </StyledText>
          <StyledText>{participant.country_wins}</StyledText>
        </View>
        <View>
          <StyledText>🎸 Genre: </StyledText>
          <StyledText>{participant.genre}</StyledText>
        </View>
        <View>
          <StyledText>🎧 Listen to the song via Spotify:</StyledText>
          <LinkButton url={participant.spotify_url} songName={participant.song} />
        </View>
      </View>
      <Image style={{width: '50%', height: '50%'}} source={baselLogo} />
    </View>
  )
}

export default DetailsComponent
