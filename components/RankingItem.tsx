import {FunctionComponent} from 'react'
import {Image, StyleSheet} from 'react-native'
import * as Haptics from 'expo-haptics'
import {ChevronDown} from 'lucide-react-native'
import StyledText from '@/components/StyledText'
import {HStack} from '@/components/ui/hstack'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select'
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
  selectContent: {
    maxHeight: 480,
  },
})

const pointsOptions: Points[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

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
      <Select
        selectedValue={String(participant.points)}
        initialLabel={String(participant.points)}
        onValueChange={value => handleValueChange(Number(value) as Points)}>
        <SelectTrigger variant="outline" size="md" className="w-24 rounded-xl">
          <SelectInput className="text-black" placeholder="0" />
          <SelectIcon className="mr-3 text-black" as={ChevronDown} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent style={styles.selectContent}>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {pointsOptions.map(p => (
              <SelectItem key={p} label={String(p)} value={String(p)} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </HStack>
  )
}

export default RankingItem