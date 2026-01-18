import {Alert, ScrollView} from 'react-native'
import {FunctionComponent, Suspense, useEffect} from 'react'
import ParticipantComponent from "@/components/ParticipantComponent";
import Loading from "@/components/Loading";
import StyledTitle from '@/components/StyledTitle'

const Index: FunctionComponent = () => {
  useEffect(() => {
    Alert.alert(
      'Notice about participants',
      'The countries in this list are from 2025. As soon as each country has announced both the artist and song, the list will be updated to 2026.',
    )
  }, [])

  return (
    <ScrollView>
      <StyledTitle>Discover this year's participating countries!</StyledTitle>
      <Suspense fallback={<Loading loadingText="participants"/>}>
        <ParticipantComponent />
      </Suspense>
    </ScrollView>
  )
}

export default Index
