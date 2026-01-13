import {type FunctionComponent} from 'react'
import {Image, ScrollView, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {poster} from '@/types/images'
import ShowCountdowns from '@/components/ShowCountdowns'
import StyledText from '@/components/StyledText'

const Index: FunctionComponent = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View>
            <ShowCountdowns/>
          </View>
          <StyledText>Welcome to the EuroScore app!</StyledText>
          <Image source={poster} />
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Index
