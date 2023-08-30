import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiRequestTab } from '../../types/tabs'
import { getTab } from '../../lib/core/tab'
import { getPuppeteerConf } from '../../lib/api/request'

export default async function handlerTab(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const keywords = req.query.q as string
  if (keywords) {
    const apiKey = process.env.YOUTUBE_API_KEY; // Replace with your actual API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(keywords)}&type=video&part=id&maxResults=1`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();
            const videoId = data.items[0]?.id?.videoId;

            if (videoId) {
                res.status(200).json(`https://www.youtube.com/watch?v=${videoId}`)
            } else {
                res.status(500).json({ error: 'error fetching youtube backing track' })
            }
        } else {
            res.status(500).json({ error: 'error fetching youtube backing track' })
        }
    } catch (error) {
        res.status(500).json({ error: 'error fetching youtube backing track' })
    }

  } else {
    res.status(500).json({ error: 'error fetching youtube backing track' })
  }
}
