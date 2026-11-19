import {FunctionComponent} from 'react'
import {Tabs} from 'expo-router'
import {ClipboardList, House, UserRound} from 'lucide-react-native'
import GradientStyle from '@/components/GradientStyle'
import LogoutButton from '@/components/LogoutButton'

const TabsLayout: FunctionComponent = () => {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {backgroundColor: '#ffffff'},
        headerTitleStyle: {fontWeight: 'bold'},
        headerTintColor: '#ffffff',
        headerBackground: () => <GradientStyle topPosition={true} />,
        headerRight: () => <LogoutButton />,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
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
  )
}

export default TabsLayout