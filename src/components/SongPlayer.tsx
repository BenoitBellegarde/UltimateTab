import React, { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

interface SongPlayerProps {
  songName: string
  accessToken: string
}

export default function SongPlayer({ songName, accessToken }: SongPlayerProps) {
  const [trackUri, setTrackUri] = useState<string | null>(null)
  const [playerReady, setPlayerReady] = useState<boolean>(false)

  useEffect(() => {
    if (!songName) return

    async function searchForSong() {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${songName}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      const data = await response.json()
      const track = data?.tracks?.items[0]
      if (track) {
        setTrackUri(track.uri)
      } else {
        console.log(`No track found for ${songName}`)
      }
    }

    searchForSong()
  }, [songName, accessToken])

  return (
    <>
      {trackUri && (
        <SpotifyPlayer
          token={accessToken}
          uris={[trackUri]}
          initialVolume={0.5}
          callback={(state) => {
            console.log(state)
            if (!playerReady && state.isPlaying) {
              setPlayerReady(true)
            }
          }}
        />
      )}
    </>
  )
}
