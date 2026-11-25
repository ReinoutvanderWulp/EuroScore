import {FunctionComponent} from 'react'
import StyledText from '@/components/StyledText'
import {Center} from '@/components/ui/center'
import {HStack} from '@/components/ui/hstack'
import {Spinner} from '@/components/ui/spinner'

interface LoadingProps {
  loadingText: string
}

const Loading: FunctionComponent<LoadingProps> = ({loadingText}) => {
  return (
    <Center className="py-8">
      <HStack space="md" className="items-center">
        <Spinner size="small" color="#008000" />
        <StyledText>Loading {loadingText}...</StyledText>
      </HStack>
    </Center>
  )
}

export default Loading