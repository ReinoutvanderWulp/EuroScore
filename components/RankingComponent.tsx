import {FunctionComponent} from 'react'
import RankingItem from '@/components/RankingItem'
import {Text, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import {useGetParticipants} from '@/data/participants'
import {useGetRanking, useUpdateScore} from '@/data/ranking'
import {Points} from "@/types/Points";

const RankingComponent: FunctionComponent = () => {
  const {data: participants} = useGetParticipants()
  const {data: rankings} = useGetRanking()
  const updateScore = useUpdateScore()

  const handleScoreChange = (countryId: string, points: Points) => {
    if (!rankings) return

    if (points === 0) {
      updateScore.mutate({countryId, points: 0})
      return
    }

    const alreadyUsed = rankings.some(r => r.points === points && r.country_id !== countryId)

    if (alreadyUsed) {
      return
    }

    updateScore.mutate({countryId, points})
  }

  const sortedParticipants =
    participants && rankings
      ? [...participants]
          .map(p => ({
            ...p,
            points: rankings.find(r => r.country_id === p.id)?.points ?? 0,
          }))
          .sort((a, b) => b.points - a.points)
      : []

  return (
    <View style={{flex: 1}}>
      <LegendList
        style={{flex: 1}}
        data={sortedParticipants}
        renderItem={({item: participant}) => (
          <RankingItem
            participant={participant}
            onChangeScore={points => handleScoreChange(participant.id, points)}
          />
        )}
        keyExtractor={participant => participant.id}
        recycleItems={false}
        ListEmptyComponent={
            <Text>no participants found to rate</Text>
        }
      />
    </View>
  )
}

export default RankingComponent
