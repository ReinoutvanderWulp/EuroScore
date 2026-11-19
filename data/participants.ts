import {useQuery} from '@tanstack/react-query'
import {collection, getDocs, orderBy, query} from 'firebase/firestore'
import {EDITION} from '@/utils/edition'
import {Participant} from '@/interfaces/participants'
import { db } from '@/service/firebase'

const fetchParticipants = async (): Promise<Participant[]> => {
  const q = query(collection(db, 'editions', EDITION, 'participants'), orderBy('country'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({id: d.id, ...d.data()}) as Participant)
}

// De deelnemers veranderen zelden: een uur cachen bespaart Firestore-reads
const participantsOptions = {
  queryKey: ['participants', EDITION],
  queryFn: fetchParticipants,
  staleTime: 60 * 60 * 1000,
}

export const useGetParticipants = () => useQuery(participantsOptions)

// Gebruikt dezelfde cache als useGetParticipants: geen extra Firestore-read
export const useGetParticipantByCountryName = (country: string) =>
  useQuery({
    ...participantsOptions,
    select: participants => participants.find(p => p.country === country),
  })