import {Stack} from 'expo-router'
import {FunctionComponent} from 'react'
import GradientStyle from '@/components/GradientStyle'

const ParticipantsLayout: FunctionComponent = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {fontWeight: 'bold'},
        headerTintColor: '#ffffff',
        headerBackground: () => <GradientStyle topPosition={true} />,
        contentStyle: {backgroundColor: '#00008b'}
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Participants',
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
