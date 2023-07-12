export const getSpotifyAccessToken = async (
  refresh_token: string,
): Promise<{ access_token: string | boolean }> => {
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

  const data = await response.json()

  if (!response.ok) {
    return { access_token: false }
  }

  return data
}

export const getUsersPlaylists = async (refresh_token: any) => {
  const { access_token } = await getSpotifyAccessToken(refresh_token)
  return fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getPlaylistTracks = async (
  refresh_token: any,
  slug: any,
) => {
  const { access_token } = await getSpotifyAccessToken(refresh_token)
  return fetch(`https://api.spotify.com/v1/playlists/${slug}/tracks`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
