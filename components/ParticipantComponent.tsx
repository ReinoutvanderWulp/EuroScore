import {FunctionComponent, useState} from "react";
import {TextInput, View} from "react-native";
import {LegendList} from "@legendapp/list";
import ParticipantItem from "@/components/ParticipantItem";
import {useGetParticipants} from "@/data/participants";
import StyledText from '@/components/StyledText'

const ParticipantComponent: FunctionComponent = () => {
  const {data: participants} = useGetParticipants()
  const [search, setSearch] = useState('')

  const list = participants ?? []
  const searchValue = search?.toLowerCase() ?? ''
  const filteredParticipants = list.filter(p => {
    const countryName = p.country?.toLowerCase() ?? ''
    return countryName.includes(searchValue)
  })
  return (
    <View style={{flex: 1}}>
      <TextInput placeholder="Search for a country" value={search} onChangeText={setSearch} />
      <LegendList
        style={{flex: 1}}
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
