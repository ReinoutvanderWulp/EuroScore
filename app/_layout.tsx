import {FunctionComponent} from 'react'
import {Tabs} from 'expo-router'
import {TagIcon} from 'lucide-react-native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const RootLayout: FunctionComponent = () => {
    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="participants"
          options={{
            title: 'Participants',
            tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="ranking/index"
          options={{
            title: 'ScoreBoard',
            tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  )
}

export default RootLayout
