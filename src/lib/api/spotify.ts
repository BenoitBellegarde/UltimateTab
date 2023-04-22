import { SpotifyAuthResponse } from '../../types/tabs'
export const getSpotifyAccessToken = async (): Promise<SpotifyAuthResponse> => {
  const refresh_token: string = process.env.SPOTIFY_REFRESH_TOKEN
  const client_id: string = process.env.SPOTIFY_CLIENT_ID
  const client_secret: string = process.env.SPOTIFY_CLIENT_SECRET

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  })

  const data: SpotifyAuthResponse = await response.json()

  if (!response.ok) {
    return { access_token: false }
  }

  return data
}
