import {type FunctionComponent} from 'react'
import {ScrollView, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import ShowCountdowns from '@/components/ShowCountdowns'
import StyledTitle from '@/components/StyledTitle'

const Index: FunctionComponent = () => {

  return (
    <ScrollView>
      <View>
        <ShowCountdowns />
      </View>
      <StyledTitle>Welcome to EuroScore, your ultimate Eurovision companion! #UnitedByMusic</StyledTitle>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Index
