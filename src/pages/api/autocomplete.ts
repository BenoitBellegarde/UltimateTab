import type { NextApiRequest, NextApiResponse } from 'next'
import { AutocompleteScrapped } from '../../types/tabs'

export default async function handlerAC(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchValue = req.query.q as string
  if (searchValue) {
    const firstWord: string = searchValue.toLowerCase().split(' ')[0]
    const scrapAc = await fetch(
      `https://www.ultimate-guitar.com/static/article/suggestions/${
        firstWord[0]
      }/${firstWord.substring(0, 5)}.js`,
    )
    try {
      const resultAc: AutocompleteScrapped = await scrapAc.json()
      if (resultAc.suggestions) {
        const filteredSuggestions = resultAc.suggestions.filter((value) =>
          value.includes(searchValue.toLowerCase()),
        )
        res.status(200).json(filteredSuggestions.splice(0, 5))
      } else {
        res.status(200).json([])
      }
    } catch (e) {
      res.status(200).json([])
    }
  } else {
    res.status(200).json([])
  }
}
