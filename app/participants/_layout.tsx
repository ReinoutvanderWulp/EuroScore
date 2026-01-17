import {Stack} from 'expo-router'
import {FunctionComponent} from 'react'

const ParticipantsLayout: FunctionComponent = () => {
  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          title: 'Participants'
        }}
      />
      <Stack.Screen
        name="[country]"
        options={{
          title: 'Details',
          headerShown: true,
        }}
      />
    </Stack>
  )
}

export default ParticipantsLayout
