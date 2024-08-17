import { ApiResponseSearch } from './../types/tabs'
import { useQuery } from 'react-query'
import { TAB_TYPES } from '../constants'
import { Pagination, Tab } from '../types/tabs'
const getFavoritesTabs = (
  favorites: Tab[],
  value: string,
  type: string,
  source: string,
): ApiResponseSearch => {
  let data: Tab[] | null = null
  if (favorites.length > 0) {
    data =
      type === 'All'
        ? favorites
        : favorites.filter((el) => el.type === TAB_TYPES[type])
    data = data.filter((el) => {
      if (source == 'artist_name') {
        return el.artist.toLowerCase().includes(value.toLowerCase())
      } else if (source == 'song_name') {
        return el.name.toLowerCase().includes(value.toLowerCase())
      } else {
        return (
          el.artist.toLowerCase().includes(value.toLowerCase()) ||
          el.name.toLowerCase().includes(value.toLowerCase())
        )
      }
    })
  }

  const pagination: Pagination = { current: 1, total: 1 }
  return { results: data, pagination }
}
export default function useFavoriteTabs(
  favorites: Tab[],
  value: string,
  type: string,
  source: string,
) {
  return useQuery(
    ['favoritesTab', favorites, value, type, source],
    () => getFavoritesTabs(favorites, value, type, source),
    {
      enabled: true,
    },
  )
}
