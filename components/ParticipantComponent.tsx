import {FunctionComponent, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import {Search, X} from 'lucide-react-native'
import InstagramFeed from '@/components/InstagramFeed'
import Loading from '@/components/Loading'
import ParticipantItem, {PARTICIPANT_ROW_HEIGHT} from '@/components/ParticipantItem'
import StyledText from '@/components/StyledText'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {useGetParticipants} from '@/data/participants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
})

const ParticipantComponent: FunctionComponent = () => {
  const {data: participants, isLoading} = useGetParticipants()
  const [search, setSearch] = useState('')

  if (isLoading) {
    return <Loading loadingText="participants" />
  }

  const searchValue = search.toLowerCase()
  const filteredParticipants = (participants ?? []).filter(p => p.country.toLowerCase().includes(searchValue))

  return (
    <View style={styles.container}>
      <Input variant="rounded" size="lg" className="mb-3">
        <InputSlot className="pl-4">
          <InputIcon as={Search} className="text-black" />
        </InputSlot>
        <InputField
          className="text-black"
          placeholder="Search for a country"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {search.length > 0 && (
          <InputSlot className="pr-4" onPress={() => setSearch('')}>
            <InputIcon as={X} className="text-black" />
          </InputSlot>
        )}
      </Input>
      <LegendList
        style={styles.container}
        contentContainerStyle={styles.listContent}
        data={filteredParticipants}
        estimatedItemSize={PARTICIPANT_ROW_HEIGHT}
        renderItem={({item: participant}) => <ParticipantItem participant={participant} />}
        keyExtractor={participant => participant.id}
        recycleItems={true}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<StyledText>No results were found for: {searchValue}</StyledText>}
        ListFooterComponent={<InstagramFeed />}
      />
    </View>
  )
}

export default ParticipantComponent