import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handlerTab(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const keywords = req.query.q as string
  if (keywords) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(keywords)}&type=video&part=id&maxResults=1`;

    try {
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();
            const videoId = data.items[0]?.id?.videoId;

            if (videoId) {
                res.status(200).json(`https://www.youtube.com/watch?v=${videoId}`)
                res.status(200).json(`https://www.youtube.com/watch?v=adV8-_hgL4g&ab`)

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
