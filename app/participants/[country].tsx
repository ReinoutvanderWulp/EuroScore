import {FunctionComponent, Suspense} from 'react'
import DetailsComponent from '@/components/DetailsComponent'
import Loading from '@/components/Loading'

const Details: FunctionComponent = () => {
  return (
    <Suspense fallback={<Loading loadingText="details"/>}>
      <DetailsComponent/>
    </Suspense>
  )
}

export default Details
