import { useQuery } from 'react-query'
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
  let data = await response.json()
  // Loop through each chords in the object and get rid of the last key
  // For some reasons UG add a last key with the chord name only on the "transpose" endpoint
  for (let key in data) {
    if (Array.isArray(data[key])) {
      data[key].pop()
    }
  }
  return data
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
