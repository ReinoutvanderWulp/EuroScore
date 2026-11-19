import {useCallback} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {doc, getDoc, runTransaction} from 'firebase/firestore'
import {useAuth} from '@/context/AuthContext'
import {EDITION} from '@/utils/edition'
import {Points} from '@/types/Points'
import { db } from '@/service/firebase'

// Zelfde vorm als de oude Supabase-tabel, zodat de componenten niet hoeven te veranderen
export interface RankingRow {
  country_id: string
  points: number
}

type Scores = Record<string, number>

const rankingRef = (uid: string) => doc(db, 'users', uid, 'rankings', EDITION)
const rankingKey = (uid?: string) => ['ranking', EDITION, uid] as const

export const POINTS_ALREADY_ASSIGNED = 'POINTS_ALREADY_ASSIGNED'

export const useGetRanking = () => {
  const {user} = useAuth()
  const uid = user?.uid

  return useQuery({
    queryKey: rankingKey(uid),
    enabled: !!uid,
    queryFn: async (): Promise<RankingRow[]> => {
      if (!uid) return []
      const snapshot = await getDoc(rankingRef(uid))
      const scores = (snapshot.data()?.scores ?? {}) as Scores
      return Object.entries(scores).map(([country_id, points]) => ({country_id, points}))
    },
  })
}

interface UpdateScoreVariables {
  countryId: string
  points: Points
}

export const useUpdateScore = () => {
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const key = rankingKey(user?.uid)

  return useMutation({
    mutationFn: async ({countryId, points}: UpdateScoreVariables) => {
      if (!user) throw new Error('Not signed in')
      const ref = rankingRef(user.uid)

      await runTransaction(db, async tx => {
        const snapshot = await tx.get(ref)
        const scores = (snapshot.data()?.scores ?? {}) as Scores

        const isUsed = Object.entries(scores).some(([id, p]) => p === points && id !== countryId)
        if (points > 0 && isUsed) throw new Error(POINTS_ALREADY_ASSIGNED)

        tx.set(ref, {scores: {[countryId]: points}}, {merge: true})
      })
    },
    // Optimistische update: de Picker springt niet terug terwijl Firestore bezig is
    onMutate: async ({countryId, points}) => {
      await queryClient.cancelQueries({queryKey: key})
      const previous = queryClient.getQueryData<RankingRow[]>(key)
      queryClient.setQueryData<RankingRow[]>(key, old => [
        ...(old ?? []).filter(r => r.country_id !== countryId),
        {country_id: countryId, points},
      ])
      return {previous}
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(key, context?.previous)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({queryKey: key})
    },
  })
}

export const useRefreshData = () => {
  const queryClient = useQueryClient()
  return useCallback(() => {
    void queryClient.invalidateQueries()
  }, [queryClient])
}