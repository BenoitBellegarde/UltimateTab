import { useQuery } from 'react-query'
export const getSpotifyPlaylists = async (): Promise<Object[]> => {
  const response = await fetch(`/api/playlists`)
  const {items} = await response.json()
  return items
}
export default function useSpotifyPlaylists() {
  return useQuery(['getSpotifyPlaylists'], () => getSpotifyPlaylists(), {enabled : false})
}
