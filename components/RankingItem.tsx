import {FunctionComponent} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {Participant} from '@/interfaces/participants'
import {Picker} from '@react-native-picker/picker'
import {Points} from "@/types/Points";
import * as Haptics from 'expo-haptics'
import StyledText from '@/components/StyledText'

interface RankingItemProps {
  participant: Participant & {points: number}
  onChangeScore: (points: Points) => void
}

const styles = StyleSheet.create({
  flag: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 110,
    color: 'white',
  },
  text: {
    flex: 1,
  }
})

const RankingItem: FunctionComponent<RankingItemProps> = ({participant, onChangeScore}) => {
  const pointsOptions: Points[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

  const handleValueChange = (value: Points) => {
    if (value === participant.points) return
    onChangeScore(value)

    if (value === 12){
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }

  return (
    <View style={styles.row}>
      {participant.flag_url && <Image source={{uri: participant.flag_url}} style={styles.flag} />}
      <StyledText style={styles.text}>
        {participant.country} {participant.points === 12 ? ' ⭐' : ' ☆'}
      </StyledText>
      <Picker
        style={styles.picker}
        dropdownIconColor="white"
        selectedValue={participant.points}
        onValueChange={value => handleValueChange(value as Points)}>
        {pointsOptions.map(p => (
          <Picker.Item key={p} label={String(p)} value={p} />
        ))}
      </Picker>
    </View>
  )
}

export default RankingItem
