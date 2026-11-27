import {FunctionComponent} from 'react'
import {Stack} from 'expo-router'
import AppHeader from '@/components/AppHeader'
import {useThemeColors} from '@/hooks/useThemeColors'

const ParticipantsLayout: FunctionComponent = () => {
  const colors = useThemeColors()

  return (
    <Stack
      screenOptions={{
        header: ({options, route, back, navigation}) => (
          <AppHeader
            title={options.title ?? route.name}
            onBack={back ? () => navigation.goBack() : undefined}
          />
        ),
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen name="index" options={{title: 'Participants'}} />
      <Stack.Screen name="[country]" options={{title: 'Details'}} />
    </Stack>
  )
}

export default ParticipantsLayout