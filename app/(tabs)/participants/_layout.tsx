import {FunctionComponent} from 'react'
import {Stack} from 'expo-router'
import AppHeader from '@/components/AppHeader'

const ParticipantsLayout: FunctionComponent = () => {
  return (
    <Stack
      screenOptions={{
        header: ({options, route, back, navigation}) => (
          <AppHeader
            title={options.title ?? route.name}
            onBack={back ? () => navigation.goBack() : undefined}
          />
        ),
        contentStyle: {backgroundColor: '#ffffff'},
      }}>
      <Stack.Screen name="index" options={{title: 'Participants'}} />
      <Stack.Screen name="[country]" options={{title: 'Details'}} />
    </Stack>
  )
}

export default ParticipantsLayout