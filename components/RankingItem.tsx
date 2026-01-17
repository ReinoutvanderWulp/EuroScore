import {FunctionComponent} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {Participant} from '@/interfaces/participants'
import {Picker} from '@react-native-picker/picker'
import {Points} from "@/types/Points";

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
  },
  picker: {
    width: 100
  }
})

const RankingItem: FunctionComponent<RankingItemProps> = ({participant, onChangeScore}) => {
  const pointsOptions: Points[] = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

  return (
    <View style={styles.row}>
      {participant.flag_url && <Image source={{uri: participant.flag_url}} style={styles.flag} />}
      <Text>
        {participant.country} {participant.points === 12 ? ' ⭐' : ' ☆'}
      </Text>
      <Picker
        style={styles.picker}
        selectedValue={participant.points}
        onValueChange={value => onChangeScore(value as Points)}>
        <Picker.Item label="0" value={0} />
        {pointsOptions.map(p => (
          <Picker.Item key={p} label={String(p)} value={p} />
        ))}
      </Picker>
    </View>
  )
}

export default RankingItem
