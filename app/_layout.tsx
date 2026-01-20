import {FunctionComponent} from 'react'
import {Tabs} from 'expo-router'
import {ClipboardList, House, UserRound} from 'lucide-react-native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
const queryClient = new QueryClient()
import EurovisionNotifications from '@/components/EurovisionNotifications'
import GradientStyle from '@/components/GradientStyle'
import {StyleSheet, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const RootLayout: FunctionComponent = () => {
  const styles = StyleSheet.create({
    rootStyle: {
      flex: 1,
      backgroundColor: '#00008b',
    },
    gestureStyle: {
        flex: 1,
    }
  })

  return (
    <GluestackUIProvider mode="dark">
        <GestureHandlerRootView style={styles.gestureStyle}>
            <QueryClientProvider client={queryClient}>
                <View style={styles.rootStyle}>
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
        </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}

export default RootLayout
