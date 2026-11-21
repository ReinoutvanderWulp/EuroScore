import {FunctionComponent, Suspense} from 'react'
import {StyleSheet, View} from 'react-native'
import DetailsComponent from '@/components/DetailsComponent'
import Loading from '@/components/Loading'
import {SCREEN_PADDING} from '@/utils/layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
  },
})

const Details: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading loadingText="details" />}>
        <DetailsComponent />
      </Suspense>
    </View>
  )
}

export default Details