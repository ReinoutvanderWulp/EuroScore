import {View, Text} from 'react-native'
import {FunctionComponent, Suspense} from 'react'
import RankingComponent from "@/components/RankingComponent";
import Loading from "@/components/Loading";

const Index: FunctionComponent = ()=> {
  return (
    <View style={{flex: 1}}>
      <Text>Europe starts voting now! Get ready to share the points among your favorite songs!</Text>
        <Suspense fallback={<Loading loadingText="scoreboard"/>}>
            <RankingComponent/>
        </Suspense>
    </View>
  )
}

export default Index
