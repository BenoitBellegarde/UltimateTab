import { getPlaylistTracks } from '../../../lib/api/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'


export default async function handlerPlaylistBySlug(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query
  const { accessToken } = await getToken({ req })
  const response = await getPlaylistTracks(accessToken,slug)
  const { items } = await response.json()
  return res.status(200).json(items)
}
