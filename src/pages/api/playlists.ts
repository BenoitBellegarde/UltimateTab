import { getUsersPlaylists } from '../../lib/api/spotify';
import {getSession} from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handlerPlaylists(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
  const {accessToken} = await getToken({ req })
  console.log(accessToken)
  const response = await getUsersPlaylists(accessToken);
  const {items} = await response.json();

  return res.status(200).json({items});
};
