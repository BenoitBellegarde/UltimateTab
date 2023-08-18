import { ApiResponseSearch } from './../types/tabs'
import { useQuery } from 'react-query'
const getDatas = async (
  value: string,
  type: string,
  page: number,
  signal: AbortSignal,
): Promise<ApiResponseSearch> => {
  const response = await fetch(
    `/api/search?q=${value}&type=${type}&page=${page}`,
    { signal },
  )
  return await response.json()
}
export default function useTabsList(value: string, type: string, page: number) {
  const valueLowered = value.toLowerCase()
  return useQuery(
    ['searchTab', valueLowered, type, page],
    async ({ signal }) => getDatas(valueLowered, type, page, signal),
    {
      enabled: valueLowered.length > 0 && type.length > 0,
    },
  )
}
