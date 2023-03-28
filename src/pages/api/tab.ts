import { formatRequest } from '../../lib/api/request'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiRequestSearch } from '../../types/tabs'
import { getTab } from '../../lib/core/tab'

export default async function handlerTab(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let formattedReq: ApiRequestSearch = formatRequest(req.url)
  if (formattedReq.args.q) {
    let tabs = await getTab(formattedReq.args.q)
    if (tabs) {
      res.status(200).json(tabs)
    } else {
      res.status(500).json({ error: 'failed to load data' })
    }
  } else {
    res.status(500).json({ error: '"q" parameter is missing' })
  }
}
