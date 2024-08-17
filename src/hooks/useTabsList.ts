import { ApiResponseSearch } from './../types/tabs'
import { useQuery } from 'react-query'
const getDatas = async (
  value: string,
  type: string,
  page: number,
  source: string,
  signal: AbortSignal,
): Promise<ApiResponseSearch> => {
  const response = await fetch(
    `/api/search?q=${value}&type=${type}&page=${page}&source=${source}`,
    { signal },
  )
  return await response.json()
}
export default function useTabsList(
  value: string,
  type: string,
  page: number,
  source: string,
) {
  const valueLowered = value.toLowerCase()
  return useQuery(
    ['searchTab', valueLowered, type, page, source],
    async ({ signal }) => getDatas(valueLowered, type, page, source, signal),
    {
      enabled: valueLowered.length > 0 && type.length > 0,
    },
  )
}
