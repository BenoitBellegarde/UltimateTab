import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handlerTab(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const keywords = req.query.q as string
  if (keywords && typeof process.env.YOUTUBE_API_KEY === 'string') {
    const listApiKeys = process.env.YOUTUBE_API_KEY.split(',')
    let noKeyWorking = true
    for (let i = 0; i < listApiKeys.length; i++) {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${
        listApiKeys[i]
      }&q=${encodeURIComponent(keywords)}&type=video&part=id&maxResults=1`

      try {
        const response = await fetch(apiUrl)

        if (response.ok) {
          const data = await response.json()
          const videoId = data.items[0]?.id?.videoId

          if (videoId) {
            noKeyWorking = false
            res.status(200).json(`https://www.youtube.com/watch?v=${videoId}`)
            break
          }
        }
      } catch (error) {
        console.log('error fetching youtube backing track')
        continue
      }
    }
    if (noKeyWorking) {
      res.status(500).json({ error: 'error fetching youtube backing track' })
    }
  } else {
    res.status(500).json({ error: 'error fetching youtube backing track' })
  }
}
