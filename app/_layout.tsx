import {FunctionComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import {Stack} from 'expo-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import EurovisionNotifications from '@/components/EurovisionNotifications'
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider'
import {AuthProvider, useAuth} from '@/context/AuthContext'
import '@/global.css'

const queryClient = new QueryClient()

Notifications.setNotificationHandler({
  // Geen async nodig: we geven direct een Promise terug
  handleNotification: () =>
    Promise.resolve({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
})

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})

const RootNavigator: FunctionComponent = () => {
  const {user, loading} = useAuth()

  // Wacht tot Firebase de opgeslagen sessie heeft gelezen, anders flitst het loginscherm even
  if (loading) return null

  return (
    <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: '#ffffff'}}}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  )
}

const RootLayout: FunctionComponent = () => {
  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <View style={styles.rootStyle}>
            <EurovisionNotifications />
            <RootNavigator />
          </View>
        </AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}

export default RootLayout