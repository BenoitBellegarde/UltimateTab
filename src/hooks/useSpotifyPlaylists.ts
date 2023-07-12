import { useQuery } from 'react-query'
import { SpotifyPlaylist } from '../types/tabs'
export const getSpotifyPlaylists = async (): Promise<SpotifyPlaylist[]> => {
  const response = await fetch(`/api/playlists`)
  const {items} = await response.json()
  return items
}
export default function useSpotifyPlaylists() {
  return useQuery(['getSpotifyPlaylists'], () => getSpotifyPlaylists(), {enabled : false})
}
