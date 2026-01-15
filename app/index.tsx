import {type FunctionComponent} from 'react'
import {Image, ScrollView, View, Text} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {poster} from '@/utils/images'
import ShowCountdowns from '@/components/ShowCountdowns'

const Index: FunctionComponent = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View>
            <ShowCountdowns />
          </View>
          <Text>Welcome to EuroScore! Your ultimate Eurovision companion.</Text>
          <Image source={poster} />
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Index
