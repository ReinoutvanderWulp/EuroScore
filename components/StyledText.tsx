import {FunctionComponent} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native'

interface StyledTextProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

const StyledText: FunctionComponent<StyledTextProps> = ({children, style}) => {
  const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontSize: 16,
    }
  })

  return (
    <Text style={[styles.text, style]}>{children}</Text>
  )
}

export default StyledText
