import {FunctionComponent} from 'react'
import {Tabs} from 'expo-router'
import {TagIcon} from 'lucide-react-native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
const queryClient = new QueryClient()
import EurovisionNotifications from '@/components/EurovisionNotifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const RootLayout: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EurovisionNotifications/>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="participants"
          options={{
            title: 'Participants',
            headerShown: false,
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
