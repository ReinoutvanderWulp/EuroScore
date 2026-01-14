export interface Participant {
  id: string
  country: string
  flag_url: string | null
  artist: string
  song: string
  returning_artist: boolean
  spotify_url: string | null
  country_wins: number
  genre: string
}
