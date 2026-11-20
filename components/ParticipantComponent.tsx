import {FunctionComponent, useState} from 'react'
import {Pressable, StyleSheet, TextInput, View} from 'react-native'
import {LegendList} from '@legendapp/list'
import {Search, X} from 'lucide-react-native'
import Loading from '@/components/Loading'
import ParticipantItem from '@/components/ParticipantItem'
import StyledText from '@/components/StyledText'
import {useGetParticipants} from '@/data/participants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
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
      <View style={styles.searchBox}>
        <Search size={20} color="#555555" />
        <TextInput
          style={styles.textInput}
          placeholder="Search for a country"
          placeholderTextColor="#888888"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')} hitSlop={8} accessibilityLabel="Clear search">
            <X size={20} color="#555555" />
          </Pressable>
        )}
      </View>
      <LegendList
        style={styles.container}
        data={filteredParticipants}
        estimatedItemSize={56}
        renderItem={({item: participant}) => <ParticipantItem participant={participant} />}
        keyExtractor={participant => participant.id}
        recycleItems={true}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<StyledText>No results were found for: {searchValue}</StyledText>}
      />
    </View>
  )
}

export default ParticipantComponent