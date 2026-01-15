import {Stack} from 'expo-router'
import {FunctionComponent} from 'react'

const ParticipantsLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[country]" />
    </Stack>
  )
}

export default ParticipantsLayout
