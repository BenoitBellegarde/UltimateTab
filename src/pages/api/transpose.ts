import type { NextApiRequest, NextApiResponse } from 'next'
import { AutocompleteScrapped, UGChordCollection } from '../../types/tabs'

export default async function handlerTranspose(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const queryChords = req.query as Record<string, string>
  const queryTransposeUG = new URLSearchParams(queryChords)
  if (queryChords) {
    queryTransposeUG.set('appl_api_version', '2')
    queryTransposeUG.set('custom', '0')
    queryTransposeUG.set('instr', 'guitar')
    queryTransposeUG.set('json', '1')
    queryTransposeUG.set('tuning', 'E A D G B E')

    const transposedChords = await fetch(
      `
        https://tabs.ultimate-guitar.com/tab/applicature/transpose?${queryTransposeUG.toString()}`,
      {
        headers: {
          Referer: 'https://tabs.ultimate-guitar.com/',
          Accept: 'application/json',
        },
      },
    )
    try {
      console.log(`
      https://tabs.ultimate-guitar.com/tab/applicature/transpose?${queryTransposeUG.toString()}`)
      const resultTransposedChords = await transposedChords.json()
      if (Object.keys(resultTransposedChords?.info?.applicature).length > 0) {
        res.status(200).json(resultTransposedChords.info.applicature)
      } else {
        res.status(200).json([])
      }
    } catch (e) {
      console.log(e)
      res.status(200).json([])
    }
  } else {
    res.status(200).json([])
  }
}
