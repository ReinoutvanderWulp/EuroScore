import {type FunctionComponent} from 'react'
import {Text, Image, ScrollView} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

const Index: FunctionComponent = () => {
  const logo = require("../assets/images/Eurovision2026Logo.jpg")

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <Text>Days before the grand final: 100 days to 16 may 2026.</Text>
          <Text>Also watch the semi-finals on 12 and 14 may 2026!</Text>
          <Text>Days before junior eurovision 2026: 10 days</Text>
          <Text>Welcome to the Eurovision Ranking App!</Text>
          <Image source={logo} />
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Index
