import {FunctionComponent, useMemo, useState} from "react";
import {TextInput, View} from "react-native";
import {LegendList} from "@legendapp/list";
import ListItem from "@/components/ListItem";
import {useGetParticipants} from "@/data/participants";
import {Participant} from "@/interfaces/participants";

const ListComponent: FunctionComponent = () => {
  const {data: participant} = useGetParticipants()
  const [search, setSearch] = useState('')

  const filteredParticipants = useMemo<Participant[]>(() => {
    const list: Participant[] = participant ?? []
    if (!search) return list

    return list.filter(p => p.country.toLowerCase().includes(search.toLowerCase()))
  }, [participant, search])

  return (
    <View>
      <TextInput placeholder="Search for a country" value={search} onChangeText={setSearch} />
      <LegendList
        data={filteredParticipants}
        renderItem={({item: participant}) => <ListItem participant={participant} />}
        keyExtractor={participant => participant.id}
        recycleItems={true}
      />
    </View>
  )
}

export default ListComponent
