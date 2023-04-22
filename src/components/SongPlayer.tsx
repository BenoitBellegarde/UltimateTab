import React, { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { SpotifyAccessToken } from '../types/tabs'

const SPOTIFY_CLIENT_ID =
  'BQAggQigHk6NlF4Mlhrj9Bco8iBB3-LtCZKBmj-MahxO9c7yAJqRPTdFjkPUyHUxELLkMC9IB-D6DW2WtXiWGWD4d026DbD2OWvCycW-GgWlMU4dJs7tFOgIXveeVHZ5dEMxj81tQpYrwoxvunGxjMeKNYSpz3Mvh58jOioRanFJYXLeWFlfgRSzxXeWsP81-yZMr4mkxyIm_no1IWfN9GWLrJMcgcqPhw'

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
