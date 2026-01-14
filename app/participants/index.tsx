import {ScrollView, Text} from 'react-native'
import {FunctionComponent} from 'react'

const Index: FunctionComponent = () => {

  return (
    <ScrollView>
      <Text>
        The countries in this list are from 2025. As soon as a country selects its artist and the song is available,
        this year's participant will replace last year's.
      </Text>
      <Text>Discover this year's participating countries!</Text>
      <Text>Search for a country:</Text>
      <Text>Filter by show:</Text>
    </ScrollView>
  )
}

export default Index
