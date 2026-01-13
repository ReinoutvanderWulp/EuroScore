import {ScrollView} from 'react-native'
import {FunctionComponent} from 'react'
import StyledText from '@/components/StyledText'

const Index: FunctionComponent = () => {

  return (
    <ScrollView>
      <StyledText>The coutries in this list are from 2025. As soon as the country selects its artist and the song is available,
      this year's participant will replace last years.</StyledText>
      <StyledText>Discover this years participating countries!</StyledText>
      <StyledText>Search your country:</StyledText>
      <StyledText>Filter by show:</StyledText>
    </ScrollView>
  )
}

export default Index
