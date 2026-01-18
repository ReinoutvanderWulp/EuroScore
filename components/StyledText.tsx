import {FunctionComponent} from 'react'
import {StyleSheet, Text} from 'react-native'

interface StyledTextProps {
  children?: React.ReactNode
}

const StyledText: FunctionComponent<StyledTextProps> = ({children}) => {
  const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontSize: 16,
    }
  })

  return (
    <Text style={styles.text}>{children}</Text>
  )
}

export default StyledText
