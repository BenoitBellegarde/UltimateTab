import { ApiResponseSearch } from './../types/tabs'
import { useQuery } from 'react-query'
import { TAB_TYPES } from '../constants'
import { Pagination, Tab } from '../types/tabs'
const getFavoritesTabs = (
  favorites: Tab[],
  type: string,
): ApiResponseSearch => {
  const data: Tab[] =
    type === 'All'
      ? favorites
      : favorites.filter((el) => el.type === TAB_TYPES[type])
  const pagination: Pagination = { current: 1, total: 1 }
  return { results: data, pagination }
}
export default function useFavoriteTabs(favorites: Tab[], type: string) {
  return useQuery(
    ['favoritesTab', favorites, type],
    () => getFavoritesTabs(favorites, type),
    {
      enabled: true,
    },
  )
}
