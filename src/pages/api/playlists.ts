import { getUsersPlaylists } from '../../lib/api/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';


export default async function handlerPlaylists(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
  const {accessToken} = await getToken({ req })
  const response = await getUsersPlaylists(accessToken);
  const {items} = await response.json();

  return res.status(200).json({items});
};
