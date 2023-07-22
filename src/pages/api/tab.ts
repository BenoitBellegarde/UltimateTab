import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiRequestTab } from '../../types/tabs'
import { getTab } from '../../lib/core/tab'

export default async function handlerTab(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  
  let formattedReq: ApiRequestTab = {
    url: req.query.q as string,
    width: req.query.width as string,
    height: req.query.height as string,
  }
  if (formattedReq.url) {
    let tabs = await getTab(
      formattedReq.url,
      formattedReq.width,
      formattedReq.height,
    )
    if (tabs) {
      res.status(200).json(tabs)
    } else {
      res.status(500).json({ error: 'failed to load data' })
    }
  } else {
    res.status(500).json({ error: '"q" parameter is missing' })
  }
}
