import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Badge, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useChordTransposer from '../hooks/useChordTransposer'
import { HiArrowsUpDown } from 'react-icons/hi2'
import { UGChordCollection } from '../types/tabs'
interface ChordTransposerProps {
  chords: UGChordCollection[]
  setChords: Function
}
export default function ChordTransposer({
  chords,
  setChords,
}: ChordTransposerProps): JSX.Element {
  const [amount, setAmount] = useState<number>(0)
  const { data: chordsTransposed } = useChordTransposer(Object.keys(chords))
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
  const handleClickTranspose = (amount: number) => {
    setAmount((prevVal) => prevVal + amount)
    document
      .querySelectorAll('span.js-chord-chord')
      ?.forEach(
        (el: HTMLSpanElement) =>
          (el.innerText = transposeChord(el.innerText.trim(), amount)),
      )

    setChords((prevVal: UGChordCollection) => {
      let newVal = {}
      Object.keys(prevVal).forEach((key) => {
        const newKey = transposeChord(key, amount)
        newVal[newKey] = prevVal[key]
      })
      return newVal
    })
  }

  useEffect(() => {
    if (chordsTransposed) {
      setChords(chordsTransposed)
    }
  }, [chordsTransposed, setChords])

  return (
    <Flex display={'flex'} fontSize={'sm'} alignItems={'center'}>
      <Text color={'gray.500'} as="b" mr={1}>
        {' '}
        Transpose{' '}
      </Text>
      <Icon boxSize={5} as={HiArrowsUpDown} mr={1} />
      <IconButton
        variant="outline"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
        onClick={() => handleClickTranspose(-1)}
        aria-label="Transpose down"
        icon={<MinusIcon />}
      />
      <Badge mx={2} variant="subtle" fontSize={'sm'} color={'blue.400'}>
        {amount}
      </Badge>
      <IconButton
        variant="outline"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
        onClick={() => handleClickTranspose(1)}
        aria-label="Transpose up"
        icon={<AddIcon />}
      />
    </Flex>
  )
}
