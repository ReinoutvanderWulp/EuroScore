import {FunctionComponent, ReactNode} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native'

interface StyledTextProps {
  children?: ReactNode
  style?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 16,
  },
})

const StyledText: FunctionComponent<StyledTextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>
}

export default StyledText
