import {FunctionComponent} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import * as Haptics from 'expo-haptics'
import {Participant} from '@/interfaces/participants'
import {Points} from '@/types/Points'
import StyledText from '@/components/StyledText'

interface RankingItemProps {
  participant: Participant & {points: number}
  onChangeScore: (points: Points) => void
}

// Vaste hoogtes: zo klopt de schatting van de lijst exact (zie RankingComponent)
export const RANKING_ROW_HEIGHT = 72
const PICKER_HEIGHT = 56

// Eén kleur voor de score en het pijltje
const SCORE_COLOR = '#000000'

const styles = StyleSheet.create({
  row: {
    height: RANKING_ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flag: {
    width: 40,
    height: 40,
  },
  text: {
    flex: 1,
  },
  pickerBox: {
    width: 120,
    height: PICKER_HEIGHT,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: PICKER_HEIGHT,
    color: SCORE_COLOR,
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
    <View style={styles.row}>
      {participant.flag_url && (
        <Image source={{uri: participant.flag_url}} style={styles.flag} resizeMode="contain" />
      )}
      <StyledText style={styles.text}>
        {participant.country} {participant.points === 12 ? ' ⭐' : ' ☆'}
      </StyledText>
      <View style={styles.pickerBox}>
        <Picker
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor={SCORE_COLOR}
          selectedValue={participant.points}
          onValueChange={value => handleValueChange(value as Points)}>
          {pointsOptions.map(p => (
            <Picker.Item key={p} label={String(p)} value={p} color={SCORE_COLOR} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default RankingItem