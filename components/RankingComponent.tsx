import {FunctionComponent} from 'react'
import RankingItem from '@/components/RankingItem'
import {Alert, StyleSheet, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import {useGetParticipants} from '@/data/participants'
import {useGetRanking, useRefreshData, useUpdateScore} from '@/data/ranking'
import {Points} from "@/types/Points";
import StyledText from '@/components/StyledText'
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

const Refresh_Value = 50

const RankingComponent: FunctionComponent = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })

  const {data: participants} = useGetParticipants()
  const {data: rankings} = useGetRanking()
  const updateScore = useUpdateScore()
  const refreshData = useRefreshData()
  const translateY = useSharedValue(0)
  const hapticActive = useSharedValue(false)
  const scrollY = useSharedValue(0)

  const refreshGesture = Gesture.Pan()
    .onUpdate(event => {
      if (scrollY.value > 0) return

      if (event.translationY > 0) {
        translateY.value = event.translationY

        if (event.translationY > Refresh_Value && !hapticActive.value) {
          hapticActive.value = true
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
        }
      }
    })
    .onEnd(() => {
      if (translateY.value > Refresh_Value) {
        runOnJS(refreshData)()
      }

      hapticActive.value = false
      translateY.value = withSpring(0, {
        damping: 12,
        stiffness: 120,
      })
    })
    .activeOffsetY([-10, 10])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}]
  }))

  const handleScoreChange = (countryId: string, points: Points) => {
    if (!rankings) return

    const isUsed = rankings.some(r => r.points === points && r.country_id !== countryId)

    if (points !== 0 && isUsed) {
      Alert.alert('Points already assigned', "You've already given this score to another country!")
      refreshData()
      return
    }

    updateScore.mutate({countryId, points})
  }

  const sortedParticipants = participants
    ?.map(p => ({
      ...p,
      points: rankings?.find(r => r.country_id === p.id)?.points ?? 0,
    }))
    .sort((a, b) => b.points - a.points)

  return (
    <View style={styles.container}>
      <GestureDetector gesture={refreshGesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <LegendList
            style={styles.container}
            data={sortedParticipants}
            estimatedItemSize={50}
            renderItem={({item: participant}) => (
              <RankingItem
                participant={participant}
                onChangeScore={points => handleScoreChange(participant.id, points)}
              />
            )}
            keyExtractor={participant => `${participant.id}-${participant.points}`}
            recycleItems={true}
            ListEmptyComponent={<StyledText>no participants found to rate</StyledText>}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

export default RankingComponent
