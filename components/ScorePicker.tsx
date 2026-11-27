import {FunctionComponent, useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {ChevronDown} from 'lucide-react-native'
import BottomSheet from '@/components/BottomSheet'
import {useThemeColors} from '@/hooks/useThemeColors'
import {Points} from '@/types/Points'

interface ScorePickerProps {
  value: Points
  onChange: (points: Points) => void
}

const options: Points[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

const styles = StyleSheet.create({
  trigger: {
    width: 96,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 12,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  chip: {
    width: 72,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 14,
  },
  chipText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

const ScorePicker: FunctionComponent<ScorePickerProps> = ({value, onChange}) => {
  const [open, setOpen] = useState(false)
  const colors = useThemeColors()

  const choose = (points: Points) => {
    setOpen(false)
    onChange(points)
  }

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.trigger, {borderColor: colors.border}]}
        accessibilityRole="button"
        accessibilityLabel={`Score ${value}. Tap to change.`}>
        <Text style={[styles.triggerText, {color: colors.text}]}>{value}</Text>
        <ChevronDown size={18} color={colors.text} />
      </Pressable>

      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        <Text style={[styles.title, {color: colors.text}]}>Choose a score</Text>
        <View style={styles.grid}>
          {options.map(points => {
            const selected = points === value
            return (
              <Pressable
                key={points}
                onPress={() => choose(points)}
                style={[
                  styles.chip,
                  {
                    borderColor: selected ? '#008000' : colors.border,
                    backgroundColor: selected ? '#008000' : colors.surface,
                  },
                ]}
                accessibilityRole="button"
                accessibilityState={{selected}}>
                <Text style={[styles.chipText, {color: selected ? '#ffffff' : colors.text}]}>{points}</Text>
              </Pressable>
            )
          })}
        </View>
      </BottomSheet>
    </>
  )
}

export default ScorePicker