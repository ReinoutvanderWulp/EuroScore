import {FunctionComponent} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import {StyleSheet} from 'react-native'

interface GradientStyleProps {
  topPosition: boolean
}

const GradientStyle: FunctionComponent<GradientStyleProps> = ({topPosition}) => {
  return (
    <LinearGradient
      colors={['#ff0000', '#0000ff']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[StyleSheet.absoluteFill, {
        overflow: 'hidden',
        borderBottomLeftRadius: topPosition ? 20 : 0,
        borderBottomRightRadius: topPosition ? 20: 0,
        borderTopLeftRadius: topPosition ? 0 : 20,
        borderTopRightRadius: topPosition ? 0 : 20,
      }]}>
    </LinearGradient>
  )
}

export default GradientStyle
