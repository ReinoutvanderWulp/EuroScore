import {FunctionComponent} from 'react'
import {View} from 'react-native'
import ShowTimer from '@/components/ShowTimer'
import {grandFinal, semiFinalOne, semiFinalTwo} from '@/utils/dates'

const ShowCountdowns: FunctionComponent = () => {
  return (
    <View>
      <ShowTimer title="Eurovision Semi-Final 1, 12 may 2026:" eventDate={semiFinalOne} showDuration={3} />
      <ShowTimer title="Eurovision Semi-Final 2, 14 may 2026:" eventDate={semiFinalTwo} showDuration={3} />
      <ShowTimer title="Eurovision Grand Final, 16 may 2026:" eventDate={grandFinal} showDuration={5} />
    </View>
  )
}

export default ShowCountdowns
