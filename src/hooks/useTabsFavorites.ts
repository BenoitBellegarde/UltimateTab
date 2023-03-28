import { useQuery } from 'react-query'
const getFavoritesTabs = (favorites : Array<any>, type: string) => {
 return type === 'All' ? favorites : favorites.filter(el => el.type === type)
}
export default function useFavoriteTabs(favorites : Array<any>, type: string) {
  return useQuery(['favoritesTab',favorites,type], () => getFavoritesTabs(favorites,type), {
    enabled: true,
  })
}
