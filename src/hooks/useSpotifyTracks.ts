import { useQuery } from 'react-query'
import { ApiResponseTab, Tab } from '../types/tabs'
export const getSpotifyTracks = async (playlistSlug: string): Promise<Object> => {
  const response = await fetch(`/api/tracks/${playlistSlug}`)
  const parsedResponse = await response.json()
  return parsedResponse
}
export default function useTabs(playlistSlug: string) {
  return useQuery(['getTab', playlistSlug], () => getSpotifyTracks(playlistSlug), {
    enabled: playlistSlug.length > 0,
  })
}
