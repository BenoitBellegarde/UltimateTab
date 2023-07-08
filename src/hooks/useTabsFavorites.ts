import { ApiResponseSearch } from './../types/tabs'
import { useQuery } from 'react-query'
import { TAB_TYPES } from '../constants'
import { Pagination, Tab } from '../types/tabs'
const getFavoritesTabs = (
  favorites: Tab[],
  value : string,
  type: string,
): ApiResponseSearch => {
  let data: Tab[] =
    type === 'All'
      ? favorites
      : favorites.filter((el) => el.type === TAB_TYPES[type])
  data = data.filter((el) => el.artist.toLowerCase().includes(value.toLowerCase()) || el.name.toLowerCase().includes(value.toLowerCase()))
  const pagination: Pagination = { current: 1, total: 1 }
  return { results: data, pagination }
}
export default function useFavoriteTabs(favorites: Tab[], value : string, type: string) {
  return useQuery(
    ['favoritesTab', favorites, value, type ],
    () => getFavoritesTabs(favorites, value, type),
    {
      enabled: true,
    },
  )
}
