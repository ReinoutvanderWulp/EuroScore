import {FunctionComponent} from 'react'
import StyledText from '@/components/StyledText'

interface LoadingProps {
  loadingText: string
}

const Loading: FunctionComponent<LoadingProps> = ({loadingText}) => {
  return (
    <StyledText>Loading {loadingText}...</StyledText>
  )
}

export default Loading
