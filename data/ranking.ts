import {supabase} from '@/utils/SupabaseClient'
import {useMutation, useQueryClient, useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query'
import {Ranking} from '@/interfaces/ranking'
import {Points} from "@/types/Points";

export const useGetRanking = (): UseSuspenseQueryResult<Ranking[], Error> => {
  return useSuspenseQuery({
    queryKey: ['rankings'],
    queryFn: () => getRanking(),
  })
}

export const useUpdateScore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateScore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['rankings']})
    },
  })
}

const getRanking = async (): Promise<Ranking[]> => {
  const {data, error} = await supabase
    .from('ranking')
    .select('*')

  if (error || !data) {
    return []
  }

  return data as Ranking[]
}

const updateScore = async ({ countryId, points }: { countryId: string; points: Points }) => {
  if (!countryId) {
    throw new Error('Missing countryId')
  }

  if (points === 0) {
    const { error } = await supabase
      .from('ranking')
      .delete()
      .eq('country_id', countryId)

    if (error) throw error
    return
  }

  const { error } = await supabase
    .from('ranking')
    .upsert({ country_id: countryId, points })

  if (error) throw error
}
