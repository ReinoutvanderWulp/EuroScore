import {ScrollView, Text} from 'react-native'
import {FunctionComponent, Suspense} from 'react'
import ParticipantComponent from "@/components/ParticipantComponent";
import Loading from "@/components/Loading";

const Index: FunctionComponent = () => {
  return (
    <ScrollView>
      <Text>
        The countries in this list are from 2025. As soon as each country has announced both the artist and song, the
        list will be updated to 2026.
      </Text>
      <Text>Discover this year's participating countries!</Text>
      <Suspense fallback={<Loading loadingText="participants"/>}>
        <ParticipantComponent />
      </Suspense>
    </ScrollView>
  )
}

export default Index
