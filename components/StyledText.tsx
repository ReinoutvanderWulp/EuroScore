import {FunctionComponent} from 'react'
import {Text, TextProps} from 'react-native'

const StyledText: FunctionComponent<TextProps> = (props) => {
  return <Text {...props} style={[{fontFamily: 'Eurovision'}, props.style]}></Text>
}

export default StyledText
