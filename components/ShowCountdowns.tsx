import {FunctionComponent} from 'react'
import {View} from 'react-native'
import ShowTimer from '@/components/ShowTimer'
import {grandFinal, semiFinalOne, semiFinalTwo} from '@/utils/dates'

const ShowCountdowns: FunctionComponent = () => {
  return (
    <View>
      <ShowTimer title="Eurovision Semi-Final 1" eventDate={semiFinalOne} rewatchTime={3} />
      <ShowTimer title="Eurovision Semi-Final 2" eventDate={semiFinalTwo} rewatchTime={3} />
      <ShowTimer title="Eurovision Grand Final" eventDate={grandFinal} rewatchTime={5} />
    </View>
  )
}

export default ShowCountdowns
