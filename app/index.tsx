import {type FunctionComponent} from 'react'
import {Image, ScrollView, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {poster} from '@/utils/images'
import ShowCountdowns from '@/components/ShowCountdowns'
import StyledTitle from '@/components/StyledTitle'

const Index: FunctionComponent = () => {

  return (
        <ScrollView>
          <View>
            <ShowCountdowns />
          </View>
          <StyledTitle>Welcome to EuroScore! Your ultimate Eurovision companion.</StyledTitle>
          <Image source={poster} />
          <StatusBar style="auto" />
        </ScrollView>
  )
}

export default Index
