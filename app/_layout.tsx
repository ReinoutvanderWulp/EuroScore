import {FunctionComponent, useEffect} from 'react'
import {Tabs} from 'expo-router'
import {TagIcon} from 'lucide-react-native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import {AndroidImportance} from 'expo-notifications'
import {Platform} from 'react-native'
import {grandFinal, semiFinalOne, semiFinalTwo} from '@/utils/dates'
const queryClient = new QueryClient()

Notifications.setNotificationHandler({
  handleNotification: async() => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldShowList: true,
    shouldShowBanner: true,
    shouldSetBadge: false,
  }),
})

const RootLayout: FunctionComponent = () => {
  const events = [
    {title: 'First Semi-Final 🎤', date: semiFinalOne},
    {title: 'Second Semi-Final 🎤', date: semiFinalTwo},
    {title: 'The Grand Final 🏆', date: grandFinal},
  ]

  const setNotifications = async () => {
    const {status} = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') return

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('eurovision-alerts', {
        name: 'Eurovision Meldingen',
        importance: AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6200ee',
      })
    }

    for (const event of events){
      const triggerDate = new Date(event.date.getTime() - 15 * 60_000)

      if (triggerDate > new Date()){
        await Notifications.scheduleNotificationAsync({
          content: {
            title: event.title,
            body: 'Get ready! The show starts in 15 minutes!',
          },
          trigger: {
            date: triggerDate,
            channelId: 'eurovision-alerts'
          }
        })
      }
    }
  }

  useEffect(() => {
    setNotifications()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
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
