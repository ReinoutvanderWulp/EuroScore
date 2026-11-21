import {type FunctionComponent} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import FullWidthImage from '@/components/FullWidthImage'
import ShowCountdowns from '@/components/ShowCountdowns'
import StyledTitle from '@/components/StyledTitle'
import {logo, logoBurgas} from '@/utils/images'
import { SCREEN_PADDING } from '@/utils/layout'

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
  },
})

const Index: FunctionComponent = () => {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View>
        <ShowCountdowns />
      </View>
      <StyledTitle>Welcome to EuroScore, your ultimate Eurovision companion! #UnitedByMusic 🎤</StyledTitle>
      <View>
        <FullWidthImage source={logo} />
        <StyledTitle>
          Join us in 2027 on 11, 13 and 15 may! ✨ Live from Burgas in our host country Bulgaria! 🇧🇬
        </StyledTitle>
        <FullWidthImage source={logoBurgas} />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Index