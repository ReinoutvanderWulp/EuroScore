import {type FunctionComponent} from 'react'
import {Image, ScrollView, View, Text} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {poster} from '@/utils/images'
import ShowCountdowns from '@/components/ShowCountdowns'

const Index: FunctionComponent = () => {

  return (
        <ScrollView>
          <View>
            <ShowCountdowns />
          </View>
          <Text>Welcome to EuroScore! Your ultimate Eurovision companion.</Text>
          <Image source={poster} />
          <StatusBar style="auto" />
        </ScrollView>
  )
}

export default Index
