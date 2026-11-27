import {FunctionComponent} from 'react'
import {Image, ScrollView, StyleSheet} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import FullWidthImage from '@/components/FullWidthImage'
import LinkButton from '@/components/LinkButton'
import Loading from '@/components/Loading'
import StyledText from '@/components/StyledText'
import {Badge, BadgeText} from '@/components/ui/badge'
import {Card} from '@/components/ui/card'
import {Divider} from '@/components/ui/divider'
import {Heading} from '@/components/ui/heading'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {VStack} from '@/components/ui/vstack'
import {useGetParticipantByCountryName} from '@/data/participants'
import {esc2026stage} from '@/utils/images'

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  flag: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
})

interface InfoRowProps {
  label: string
  value: string
}

const InfoRow: FunctionComponent<InfoRowProps> = ({label, value}) => (
  <VStack space="xs">
    <Text size="sm" className="text-typography-900">
      {label}
    </Text>
    <Heading size="md" className="text-typography-900">
      {value}
    </Heading>
  </VStack>
)

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
      <VStack space="lg" className="pt-4">
        <HStack space="lg" className="items-center">
          {participant.flag_url && (
            <Image source={{uri: participant.flag_url}} style={styles.flag} resizeMode="contain" />
          )}
          <VStack className="flex-1">
            <Heading size="2xl" className="text-typography-900" numberOfLines={2}>
              {participant.country}
            </Heading>
            <Text size="md" className="text-typography-900">
              {participant.artist}
            </Text>
          </VStack>
        </HStack>

        <HStack space="sm" className="flex-wrap">
          <Badge action="muted" variant="outline" size="lg">
            <BadgeText className="text-typography-900">🎸 {participant.genre}</BadgeText>
          </Badge>
          <Badge action="muted" variant="outline" size="lg">
            <BadgeText className="text-typography-900">
              🏆 {participant.country_wins} {participant.country_wins === 1 ? 'victory' : 'victories'}
            </BadgeText>
          </Badge>
          <Badge action="muted" variant="outline" size="lg">
            <BadgeText className="text-typography-900">
              {participant.returning_artist ? '🔄 Returning artist' : '🆕 New artist'}
            </BadgeText>
          </Badge>
        </HStack>

        <Card variant="elevated" size="lg" className="rounded-2xl">
          <VStack space="md">
            <InfoRow label="🎤 Artist" value={participant.artist} />
            <Divider />
            <InfoRow label="🎵 Song" value={participant.song} />
          </VStack>
        </Card>

        <VStack space="sm">
          <Heading size="sm" className="text-typography-900">
            🎧 Listen to the song via Spotify
          </Heading>
          <LinkButton url={participant.spotify_url} songName={participant.song} />
        </VStack>

        <FullWidthImage source={esc2026stage} />
      </VStack>
    </ScrollView>
  )
}

export default DetailsComponent