import {FunctionComponent} from 'react'
import {Image, StyleSheet} from 'react-native'
import * as Haptics from 'expo-haptics'
import ScorePicker from '@/components/ScorePicker'
import StyledText from '@/components/StyledText'
import {HStack} from '@/components/ui/hstack'
import {Participant} from '@/interfaces/participants'
import {Points} from '@/types/Points'

interface RankingItemProps {
  participant: Participant & {points: number}
  onChangeScore: (points: Points) => void
}

// Vaste hoogte: zo klopt de schatting van de lijst exact (zie RankingComponent)
export const RANKING_ROW_HEIGHT = 68

const styles = StyleSheet.create({
  row: {
    height: RANKING_ROW_HEIGHT,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  text: {
    flex: 1,
  },
})

const RankingItem: FunctionComponent<RankingItemProps> = ({participant, onChangeScore}) => {
  const handleValueChange = (value: Points) => {
    if (value === participant.points) return
    onChangeScore(value)

    if (value === 12) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }

  return (
    <HStack space="md" className="items-center border-b border-outline-100" style={styles.row}>
      {participant.flag_url && (
        <Image source={{uri: participant.flag_url}} style={styles.flag} resizeMode="contain" />
      )}
      <StyledText style={styles.text}>
        {participant.country} {participant.points === 12 ? ' ⭐' : ' ☆'}
      </StyledText>
      <ScorePicker value={participant.points as Points} onChange={handleValueChange} />
    </HStack>
  )
}

export default RankingItem