import {FunctionComponent} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import Loading from '@/components/Loading'
import RankingItem, {RANKING_ROW_HEIGHT} from '@/components/RankingItem'
import StyledText from '@/components/StyledText'
import {useGetParticipants} from '@/data/participants'
import {POINTS_ALREADY_ASSIGNED, useGetRanking, useRefreshData, useUpdateScore} from '@/data/ranking'
import {Points} from '@/types/Points'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
})

const RankingComponent: FunctionComponent = () => {
  const {data: participants, isLoading: participantsLoading} = useGetParticipants()
  const {data: rankings, isLoading: rankingsLoading} = useGetRanking()
  const updateScore = useUpdateScore()
  const refreshData = useRefreshData()

  if (participantsLoading || rankingsLoading) {
    return <Loading loadingText="scoreboard" />
  }

  const handleScoreChange = (countryId: string, points: Points) => {
    if (!rankings) return

    const isUsed = rankings.some(r => r.points === points && r.country_id !== countryId)

    if (points !== 0 && isUsed) {
      Alert.alert('Points already assigned', "You've already given this score to another country!")
      refreshData()
      return
    }

    updateScore.mutate(
      {countryId, points},
      {
        // Bij een fout zet de hook de oude waarde terug, zodat de Picker meebeweegt
        onError: error => {
          if (error.message === POINTS_ALREADY_ASSIGNED) {
            Alert.alert('Points already assigned', "You've already given this score to another country!")
          } else {
            Alert.alert('Could not save your score', 'Please check your connection and try again.')
          }
        },
      },
    )
  }

  const sortedParticipants = (participants ?? [])
    .map(p => ({
      ...p,
      points: rankings?.find(r => r.country_id === p.id)?.points ?? 0,
    }))
    .sort((a, b) => b.points - a.points)

  return (
    <View style={styles.container}>
      <LegendList
        style={styles.container}
        data={sortedParticipants}
        estimatedItemSize={RANKING_ROW_HEIGHT}
        contentContainerStyle={styles.listContent}
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
    </View>
  )
}

export default RankingComponent