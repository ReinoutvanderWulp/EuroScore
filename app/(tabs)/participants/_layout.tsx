import {FunctionComponent} from 'react'
import {Stack} from 'expo-router'
import GradientStyle from '@/components/GradientStyle'
import LogoutButton from '@/components/LogoutButton'

const ParticipantsLayout: FunctionComponent = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {fontWeight: 'bold'},
        headerTintColor: '#ffffff',
        headerBackground: () => <GradientStyle topPosition={true} />,
        headerRight: () => <LogoutButton />,
        contentStyle: {backgroundColor: '#ffffff', paddingHorizontal: 16},
      }}>
      <Stack.Screen name="index" options={{title: 'Participants'}} />
      <Stack.Screen name="[country]" options={{title: 'Details', headerShown: true}} />
    </Stack>
  )
}

export default ParticipantsLayout