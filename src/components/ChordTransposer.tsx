import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useChordTransposer from '../hooks/useChordTransposer'
import { UGChordCollection } from '../types/tabs'
interface ChordTransposerProps {
  chords: UGChordCollection[]
}

export default function ChordTransposer({
  chords
}: ChordTransposerProps): JSX.Element {
  const [amount, setAmount] = useState<number>(0)
  const [chordsModified, setChordsModified] = useState<UGChordCollection[]>(chords)
  const {data : chordsTransposed} = useChordTransposer(chordsModified)
  const transposeChord = (chord: string, amount: number) => {
    var scale = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ]
    return chord.replace(/[CDEFGAB]#?/g, function (match) {
      const i = (scale.indexOf(match) + amount) % scale.length
      return scale[i < 0 ? i + scale.length : i]
    })
  }

  useEffect(() => {
    console.log(amount)
    document.querySelectorAll('span.text-chord')?.forEach(
      (el: HTMLSpanElement) =>
        // (el.onclick = () => {
        (el.innerText = transposeChord(el.innerText.trim(), amount)),
      // }),
    )
  }, [amount])
  return (
    <>
      <IconButton
        onClick={() => setAmount((prevVal) => prevVal - 1)}
        size={'sm'}
        aria-label="Transpose down"
        icon={<MinusIcon />}
      />
      <Button
        variant="outline"
        _active={{
          bg: 'fadebp',
          color: 'white',
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
      >
        Transpose ({amount})
      </Button>
      <IconButton
        onClick={() => setChordsModified((prevVal) => {
          return {
            ...prevVal,
            
          }
        })}
        size={'sm'}
        aria-label="Transpose up"
        icon={<AddIcon />}
      />
    </>
  )
}
