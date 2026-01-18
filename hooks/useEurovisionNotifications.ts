import {useEffect} from 'react'
import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native'
import {AndroidImportance} from 'expo-notifications'

interface EventNotification {
  title: string
  date: Date
}

export const useEurovisionNotifications = (events: EventNotification[]) => {
  useEffect(() => {
    const setupNotifications = async () => {
      const {status: existingStatus} = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== Notifications.PermissionStatus.GRANTED){
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== Notifications.PermissionStatus.GRANTED) return

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('eurovision-alerts', {
          name: 'Eurovision Notifications',
          importance: AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        })
      }

      await Notifications.cancelAllScheduledNotificationsAsync()

      for (const event of events) {
        const triggerDate = new Date(event.date.getTime() - 15 * 60_000)
        const secondsUntilTrigger = Math.floor((triggerDate.getTime() - Date.now()) / 1000)

        if (secondsUntilTrigger > 0) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: event.title,
              body: 'Get ready! The show starts in 15 minutes!',
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: secondsUntilTrigger
            }
          })
        }
      }
    }

    void setupNotifications()
  }, [events])
}
