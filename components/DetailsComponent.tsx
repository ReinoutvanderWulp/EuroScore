import {FunctionComponent} from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import {useGetParticipantByCountryName} from '@/data/participants'
import FullWidthImage from '@/components/FullWidthImage'
import LinkButton from '@/components/LinkButton'
import Loading from '@/components/Loading'
import StyledText from '@/components/StyledText'
import StyledTitle from '@/components/StyledTitle'
import {esc2026stage} from '@/utils/images'

const styles = StyleSheet.create({
  content: {
    gap: 15,
    paddingBottom: 32,
  },
  flag: {
    width: 64,
    height: 64,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spotify: {
    marginVertical: 20,
    gap: 14,
  },
})

const DetailsComponent: FunctionComponent = () => {
  const {country} = useLocalSearchParams<{country: string}>()
  const {data: participant, error, isLoading} = useGetParticipantByCountryName(country)

  if (isLoading) {
    return <Loading loadingText="participant" />
  }

  if (error) {
    return <StyledText>Error while loading data.</StyledText>
  }

  if (!participant) {
    return <StyledText>Participant not found. Try another one!</StyledText>
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <StyledTitle>Details about: {participant.country}</StyledTitle>
      {participant.flag_url && <Image source={{uri: participant.flag_url}} style={styles.flag} />}
      <View>
        <View style={styles.row}>
          <StyledText>🎤 Artist: </StyledText>
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
        <View style={styles.spotify}>
          <StyledText>🎧 Listen to the song via Spotify:</StyledText>
          <LinkButton url={participant.spotify_url} songName={participant.song} />
        </View>
      </View>
      <FullWidthImage source={esc2026stage} />
    </ScrollView>
  )
}

export default DetailsComponent