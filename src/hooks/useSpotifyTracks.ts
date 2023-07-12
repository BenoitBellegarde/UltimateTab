import { useQuery } from 'react-query'
import { SpotifyPlaylist, SpotifyTrack } from '../types/tabs'
export const getSpotifyTracks = async (playlist: SpotifyPlaylist): Promise<SpotifyTrack[]> => {
  const response = await fetch(`/api/tracks/${playlist.id}`)
  const parsedResponse = await response.json()
  return parsedResponse
}
export default function useTabs(playlist: SpotifyPlaylist | null) {
  return useQuery(['getTab', playlist], () => getSpotifyTracks(playlist), {
    enabled: playlist !== null,
  })
}
