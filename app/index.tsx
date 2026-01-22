import {type FunctionComponent} from 'react'
import {ScrollView, View, Image, StyleSheet} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {
  banner,
  drawResults,
  extraBanner,
  poster,
  stage,
  stageOne,
  stageTwo,
  voting,
} from '@/utils/images'
import ShowCountdowns from '@/components/ShowCountdowns'
import StyledTitle from '@/components/StyledTitle'
import ImageSlider from '@/components/ImageSlider'

const Index: FunctionComponent = () => {
  const styles = StyleSheet.create({
    image: {
      marginBottom: 10,
    }
  })

  const imageSliderPosters = [
    extraBanner, banner
  ]

  const imageSliderDraw = [
    drawResults, voting
  ]

  const imageSliderStage = [
    stage, stageOne, stageTwo
  ]

  return (
    <ScrollView>
      <View>
        <ShowCountdowns />
      </View>
      <StyledTitle>Welcome to EuroScore! Your ultimate Eurovision companion. #UnitedByMusic</StyledTitle>
      <Image source={poster} style={styles.image}/>
      <ImageSlider images={imageSliderPosters}/>
      <StyledTitle>Check out the draw results!</StyledTitle>
      <ImageSlider images={imageSliderDraw}/>
      <StyledTitle>Check out the images from the stage for Vienna 2026!</StyledTitle>
      <ImageSlider images={imageSliderStage}/>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Index
