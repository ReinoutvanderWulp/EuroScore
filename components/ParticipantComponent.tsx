import {FunctionComponent, useState} from "react";
import {StyleSheet, TextInput, View} from 'react-native'
import {LegendList} from "@legendapp/list";
import ParticipantItem from "@/components/ParticipantItem";
import {useGetParticipants} from "@/data/participants";
import StyledText from '@/components/StyledText'
import {Search} from 'lucide-react-native'

const ParticipantComponent: FunctionComponent = () => {
  const styles = StyleSheet.create({
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'white',
    },
    container: {
      gap: 15,
      flex: 1,
    }
  })

  const {data: participants} = useGetParticipants()
  const [search, setSearch] = useState('')

  const list = participants ?? []
  const searchValue = search?.toLowerCase() ?? ''
  const filteredParticipants = list.filter(p => {
    const countryName = p.country?.toLowerCase() ?? ''
    return countryName.includes(searchValue)
  })
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Search size={20} color="white"/>
        <TextInput placeholder="Search for a country" placeholderTextColor="white" value={search} onChangeText={setSearch} />
      </View>
      <LegendList
        data={filteredParticipants}
        renderItem={({item: participant}) => <ParticipantItem participant={participant} />}
        keyExtractor={participant => participant.id}
        recycleItems={true}
        ListEmptyComponent={
            <StyledText>No results were found for: {searchValue}</StyledText>
        }
      />
    </View>
  )
}

export default ParticipantComponent
