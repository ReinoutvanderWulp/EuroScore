import {FunctionComponent, Suspense} from 'react'
import DetailsComponent from '@/components/DetailsComponent'
import Loading from '@/components/Loading'
import {ScrollView} from 'react-native'

const Details: FunctionComponent = () => {
  return (
    <ScrollView>
      <Suspense fallback={<Loading loadingText="details" />}>
        <DetailsComponent />
      </Suspense>
    </ScrollView>
  )
}

export default Details
