import { useQuery } from 'react-query'
export const getAutocomplete = async (
  value: string,
  signal: AbortSignal,
): Promise<string[]> => {
  const firstWord: string = value.split(' ')[0]
  const response = await fetch(`api/autocomplete?q=${value}`, { signal })
  return await response.json()
}
export default function useAutocomplete(value: string) {
  return useQuery(
    ['getAutocomplete', value],
    async ({ signal }) => getAutocomplete(value, signal),
    {
      enabled: value.length > 0,
    },
  )
}
