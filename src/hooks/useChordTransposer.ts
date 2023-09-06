import { useQuery } from 'react-query'
import { UGChordCollection } from '../types/tabs'
export const getChordTransposer = async (
  chords: UGChordCollection[],
  signal: AbortSignal,
): Promise<string[]> => {
  const urlParams = new URLSearchParams()
  Object.keys(chords).forEach((chord) => {
    urlParams.set(chord, chord)
  })
  const response = await fetch(
    `${window.location.origin}/api/transpose?${urlParams.toString()}`,
    { signal },
  )
  return await response.json()
}
export default function useChordTransposer(
  chords: UGChordCollection[],
) {
  return useQuery(
    ['getChordTransposer', chords],
    async ({ signal }) => getChordTransposer(chords, signal),
    {
      enabled: chords && Object.keys(chords).length > 0,
    },
  )
}
