import {FunctionComponent} from 'react'
import RankingItem from '@/components/RankingItem'
import {Text, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import {useGetParticipants} from '@/data/participants'
import {useGetRanking, useUpdateScore} from '@/data/ranking'
import {Points} from '@/interfaces/ranking'

const RankingComponent: FunctionComponent = () => {
  const {data: participants} = useGetParticipants()
  const {data: rankings} = useGetRanking()
  const updateScore = useUpdateScore()

  const handleScoreChange = (countryId: string, points: Points) => {
    updateScore.mutate({countryId, points})
  }

  const sortedParticipants = participants
    .map(p => {
      const ranking = rankings?.find(r => r.country_id === p.id)
      return {
        ...p,
        points: ranking?.points ?? 0,
      }
    })
    .sort((a, b) => b.points - a.points)

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
        recycleItems={true}
        ListEmptyComponent={
            <Text>no participants found to rate</Text>
        }
      />
    </View>
  )
}

export default RankingComponent
