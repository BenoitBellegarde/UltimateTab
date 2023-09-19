import { useQuery } from 'react-query'
import { UGChordCollection } from '../types/tabs'
export const getChordTransposer = async (
  keyChords: string[],
  signal: AbortSignal,
): Promise<string[]> => {
  const urlParams = new URLSearchParams()
  keyChords.forEach((chord) => {
    urlParams.set(chord, chord)
  })
  const response = await fetch(
    `${window.location.origin}/api/transpose?${urlParams.toString()}`,
    { signal },
  )
  return await response.json()
}
export default function useChordTransposer(keyChords: string[]) {
  return useQuery(
    ['getChordTransposer', keyChords],
    async ({ signal }) => getChordTransposer(keyChords, signal),
    {
      enabled: keyChords && keyChords.length > 0,
    },
  )
}
