import {FunctionComponent} from 'react'
import RankingItem from '@/components/RankingItem'
import {Alert, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import {useGetParticipants} from '@/data/participants'
import {useGetRanking, useUpdateScore} from '@/data/ranking'
import {Points} from "@/types/Points";
import StyledText from '@/components/StyledText'

const RankingComponent: FunctionComponent = () => {
  const {data: participants} = useGetParticipants()
  const {data: rankings} = useGetRanking()
  const updateScore = useUpdateScore()

  const handleScoreChange = (countryId: string, points: Points) => {
    if (!rankings) return

    const isUsed = rankings.some(r => r.points === points && r.country_id !== countryId)

    if (points !== 0 && isUsed) {
      Alert.alert('Points already assigned', "You've already given this score to another country!")
      return
    }

    updateScore.mutate({countryId, points})
  }

  const sortedParticipants = participants?.map(p => ({
    ...p,
    points: rankings?.find(r => r.country_id === p.id)?.points ?? 0
  })).sort((a, b) => b.points - a.points);

  return (
    <View style={{flex: 1}}>
      <LegendList
        style={{flex: 1}}
        data={sortedParticipants}
        estimatedItemSize={100}
        renderItem={({item: participant}) => (
          <RankingItem
            participant={participant}
            onChangeScore={points => handleScoreChange(participant.id, points)}
          />
        )}
        keyExtractor={participant => participant.id}
        recycleItems={false}
        ListEmptyComponent={
            <StyledText>no participants found to rate</StyledText>
        }
      />
    </View>
  )
}

export default RankingComponent
