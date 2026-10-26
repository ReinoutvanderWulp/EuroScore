import {FunctionComponent} from 'react'
import {View} from 'react-native'
import ShowTimer from '@/components/ShowTimer'
import {grandFinal} from '@/utils/dates'

const ShowCountdowns: FunctionComponent = () => {
  return (
    <View>
      <ShowTimer title="🏆 Eurovision Grand Final, 16 may 2026:" eventDate={grandFinal} showDuration={5} />
    </View>
  )
}

export default ShowCountdowns
