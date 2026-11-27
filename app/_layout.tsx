import {FunctionComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import {Stack} from 'expo-router'
import {DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import AppHeader from '@/components/AppHeader'
import EurovisionNotifications from '@/components/EurovisionNotifications'
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider'
import {AuthProvider, useAuth} from '@/context/AuthContext'
import {ThemePreferenceProvider, useThemePreference} from '@/context/ThemeContext'
import {useThemeColors} from '@/hooks/useThemeColors'
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
  root: {
    flex: 1,
  },
})

const RootNavigator: FunctionComponent = () => {
  const {user, loading} = useAuth()
  const colors = useThemeColors()

  // Wacht tot Firebase de opgeslagen sessie heeft gelezen, anders flitst het loginscherm even
  if (loading) return null

  return (
    <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: colors.background}}}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="delete-account"
          options={{
            headerShown: true,
            title: 'Delete account',
            presentation: 'modal',
            header: ({options, route, back, navigation}) => (
              <AppHeader
                title={options.title ?? route.name}
                onBack={back ? () => navigation.goBack() : undefined}
                showAccountButton={false}
              />
            ),
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  )
}

const ThemedNavigation: FunctionComponent = () => {
  const colors = useThemeColors()

  return (
    <NavigationThemeProvider value={colors.isDark ? DarkTheme : DefaultTheme}>
      <View style={[styles.root, {backgroundColor: colors.background}]}>
        <EurovisionNotifications />
        <RootNavigator />
      </View>
    </NavigationThemeProvider>
  )
}

const AppShell: FunctionComponent = () => {
  const {preference, loaded} = useThemePreference()

  // Wacht kort tot de opgeslagen voorkeur gelezen is, zodat het scherm niet in het verkeerde thema opent
  if (!loaded) return null

  return (
    <GluestackUIProvider mode={preference}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemedNavigation />
        </AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}

const RootLayout: FunctionComponent = () => {
  return (
    <ThemePreferenceProvider>
      <AppShell />
    </ThemePreferenceProvider>
  )
}

export default RootLayout