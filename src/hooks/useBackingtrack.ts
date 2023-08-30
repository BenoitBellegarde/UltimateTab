import { useQuery } from 'react-query'
export const getBackingtrack = async (
  searchValue: string,
  signal: AbortSignal,
): Promise<string> => {
  const response = await fetch(
    `${window.location.origin}/api/backingtrack?q=${searchValue}`,
    { signal },
  )
  return await response.json()
}
export default function useBackingtrack(searchValue: string,show : boolean) {
  return useQuery(
    ['getBackingtrack', searchValue],
    async ({ signal }) => getBackingtrack(searchValue, signal),
    {
      enabled: searchValue.length > 0 && show,
    },
  )
}
