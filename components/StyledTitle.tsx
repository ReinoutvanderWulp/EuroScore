import {FunctionComponent, ReactNode} from 'react'
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native'

interface StyledTitleProps {
  children?: ReactNode
  style?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const StyledTitle: FunctionComponent<StyledTitleProps> = ({children, style}) => {
  return <Text style={[styles.title, style]}>{children}</Text>
}

export default StyledTitle
