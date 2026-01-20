import {StyleSheet, View} from 'react-native'
import {FunctionComponent, Suspense} from 'react'
import RankingComponent from "@/components/RankingComponent";
import Loading from "@/components/Loading";
import StyledTitle from '@/components/StyledTitle'
import {ArrowUp} from 'lucide-react-native'

const Index: FunctionComponent = ()=> {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    banner: {
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'white',
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <StyledTitle>Swipe the screen up to refresh</StyledTitle>
        <ArrowUp size={20} color="white"/>
      </View>
      <StyledTitle>Europe starts voting now! Get ready to share the points among your favorite songs!</StyledTitle>
      <Suspense fallback={<Loading loadingText="scoreboard" />}>
        <RankingComponent />
      </Suspense>
    </View>
  )
}

export default Index
