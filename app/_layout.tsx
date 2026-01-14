import {FunctionComponent} from 'react'
import {Tabs} from 'expo-router'
import {TagIcon} from 'lucide-react-native'

const RootLayout: FunctionComponent = () => {

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
