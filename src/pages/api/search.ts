import { ApiResponseSearch } from './../../types/tabs'
import { formatRequest, search } from '../../lib/api/request'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiRequestSearch } from '../../types/tabs'

export default async function handlerSearch(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let formattedReq: ApiRequestSearch = formatRequest(req.url)
  if (formattedReq.args.q) {
    let tabs: ApiResponseSearch = await search(formattedReq.args)
    if (tabs) {
      if (Array.isArray(tabs.results)) {
        tabs.results = tabs.results.sort(function (elem1, elem2) {
          return (
            elem2.rating * elem2.numberRates - elem1.rating * elem1.numberRates
          )
        })
      }

      res.status(200).json(tabs)
    } else {
      res.status(500).json({ error: 'failed to load data' })
    }
  } else {
    res.status(500).json({ error: '"q" parameter is missing' })
  }
}
