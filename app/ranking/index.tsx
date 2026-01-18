import {View} from 'react-native'
import {FunctionComponent, Suspense} from 'react'
import RankingComponent from "@/components/RankingComponent";
import Loading from "@/components/Loading";
import StyledTitle from '@/components/StyledTitle'

const Index: FunctionComponent = ()=> {
  return (
    <View style={{flex: 1}}>
      <StyledTitle>Europe starts voting now! Get ready to share the points among your favorite songs!</StyledTitle>
        <Suspense fallback={<Loading loadingText="scoreboard"/>}>
            <RankingComponent/>
        </Suspense>
    </View>
  )
}

export default Index
