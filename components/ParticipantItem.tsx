import {FunctionComponent} from 'react'
import {Image, Pressable, StyleSheet} from 'react-native'
import {router} from 'expo-router'
import {ChevronRight} from 'lucide-react-native'
import {Card} from '@/components/ui/card'
import {Heading} from '@/components/ui/heading'
import {HStack} from '@/components/ui/hstack'
import {Icon} from '@/components/ui/icon'
import {Text} from '@/components/ui/text'
import {VStack} from '@/components/ui/vstack'
import {Participant} from '@/interfaces/participants'

// Vaste hoogte: zo klopt de schatting van de lijst exact
export const PARTICIPANT_ROW_HEIGHT = 84

interface ListItemProps {
  participant: Participant
}

const styles = StyleSheet.create({
  wrapper: {
    height: PARTICIPANT_ROW_HEIGHT,
    paddingVertical: 5,
  },
  flag: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
})

const ParticipantItem: FunctionComponent<ListItemProps> = ({participant}) => {
  return (
    <Pressable
      style={styles.wrapper}
      onPress={() =>
        router.push({
          pathname: '/participants/[country]',
          params: {country: participant.country},
        })
      }>
      <Card variant="outline" size="sm" className="h-full justify-center rounded-2xl">
        <HStack space="md" className="items-center">
          {participant.flag_url && (
            <Image source={{uri: participant.flag_url}} style={styles.flag} resizeMode="contain" />
          )}
          <VStack className="flex-1">
            <Heading size="sm" className="text-typography-900" numberOfLines={1}>
              {participant.country}
            </Heading>
            <Text size="sm" className="text-typography-900" numberOfLines={1}>
              {participant.artist} – {participant.song}
            </Text>
          </VStack>
          <Icon as={ChevronRight} size="md" className="text-typography-900" />
        </HStack>
      </Card>
    </Pressable>
  )
}

export default ParticipantItem