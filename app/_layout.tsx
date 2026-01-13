import {FunctionComponent, useEffect} from 'react'
import {SplashScreen, Tabs} from 'expo-router'
import {TagIcon} from 'lucide-react-native'
import {useFonts} from 'expo-font'

const RootLayout: FunctionComponent = () => {
  void SplashScreen.preventAutoHideAsync()

  const [fontsLoaded] = useFonts({})

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="participants/index"
        options={{
          title: 'Participants',
          tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ranking/index"
        options={{
          title: 'Ranking',
          tabBarIcon: ({color, size}) => <TagIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default RootLayout
