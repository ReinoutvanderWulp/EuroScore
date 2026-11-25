import {FunctionComponent, ReactNode} from 'react'
import {StyleProp, TextStyle} from 'react-native'
import {Text} from '@/components/ui/text'

interface StyledTextProps {
  children?: ReactNode
  style?: StyleProp<TextStyle>
}

const StyledText: FunctionComponent<StyledTextProps> = ({children, style}) => {
  return (
    <Text size="md" className="text-black" style={style}>
      {children}
    </Text>
  )
}

export default StyledText