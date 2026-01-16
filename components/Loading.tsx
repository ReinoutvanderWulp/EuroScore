import {FunctionComponent} from 'react'
import {Text} from 'react-native'

interface LoadingProps {
  loadingText: string
}

const Loading: FunctionComponent<LoadingProps> = ({loadingText}) => {
  return (
    <Text>Loading {loadingText}...</Text>
  )
}

export default Loading
