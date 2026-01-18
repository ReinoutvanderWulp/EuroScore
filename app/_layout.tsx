import {FunctionComponent} from 'react'
import {Tabs} from 'expo-router'
import {ClipboardList, House, UserRound} from 'lucide-react-native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
const queryClient = new QueryClient()
import EurovisionNotifications from '@/components/EurovisionNotifications'
import GradientStyle from '@/components/GradientStyle'
import {View} from 'react-native'

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
      <View style={{flex: 1, backgroundColor: '#00008b'}}>
        <EurovisionNotifications />
        <Tabs
          screenOptions={{
            tabBarInactiveTintColor: 'white',
            sceneStyle: {backgroundColor: '#00008b'},
            headerTitleStyle: {fontWeight: 'bold'},
            headerTintColor: '#ffffff',
            headerBackground: () => <GradientStyle topPosition={true} />,
            tabBarStyle: {
              backgroundColor: 'transparent',
              overflow: 'hidden',
            },
            tabBarBackground: () => <GradientStyle topPosition={false} />,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({color, size}) => <House size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="participants"
            options={{
              title: 'Participants',
              headerShown: false,
              tabBarIcon: ({color, size}) => <UserRound size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="ranking/index"
            options={{
              title: 'ScoreBoard',
              tabBarIcon: ({color, size}) => <ClipboardList size={size} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </QueryClientProvider>
  )
}

export default RootLayout
