import {ScrollView, Text, View} from 'react-native'
import {FunctionComponent} from 'react'

const Index: FunctionComponent = () => {
  const participants = [
    { id: 1, flag: 'Netherlands'},
    { id: 2, flag: 'Belgium'},
    { id: 3, flag: 'Sweden'},
    { id: 4, flag: 'Italy'},
    { id: 5, flag: 'France'},
    { id: 6, flag: 'Germany'},
  ]

  return (
    <ScrollView>
      <Text>Discover this years participating countries!</Text>
      <Text>Search your country:</Text>
      <Text>Filter by show:</Text>
      {participants.map((participant) => (
        <View key={participant.id}>
          <Text>{participant.flag}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

export default Index