import {supabase} from "@/utils/SupabaseClient";
import {Participant} from "@/interfaces/participants";
import {useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query'

export const useGetParticipants = (): UseSuspenseQueryResult<Participant[], Error> => {
  return useSuspenseQuery({
    queryKey: ['participants'],
    queryFn: () => getParticipants(),
  })
}

export const useGetParticipantById = (country: string) => {
  return useSuspenseQuery({
    queryKey: ['countryName', country],
    queryFn: () => getParticipantById(country),
  })
}

const getParticipants = async (): Promise<Participant[] | []> => {
  const {data, error} = await supabase.from('participants').select('*').order('country', {ascending: true})

  if (error || !data) {
    return []
  }

  return data as Participant[]
}

const getParticipantById = async (country: string): Promise<Participant | null> => {
  const {data, error} = await supabase.from('participants').select(`*`).eq('country', country)

  if (error || !data) {
    return null
  }

  return data[0] as Participant
}
