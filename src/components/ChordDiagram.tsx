import {
  Box,
  IconButton,
  useColorModeValue,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import useAppStateContext from '../hooks/useAppStateContext'
import ChordBox from '../../node_modules/vexchords/chordbox'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  UGChord,
  UGChordCollection,
  VexchordsChord,
  VexchordsOptions,
} from '../types/tabs'

interface ChordDiagramState {
  [key: string]: number
}

export default function ChordDiagram({
  chords,
}: {
  chords: UGChordCollection[]
}): JSX.Element {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const chordDiagramRef = useRef<HTMLDivElement>(null)
  const toast = useToast()
  const { selectedTabContent } = useAppStateContext()
  const [chordDiagramIndex, setChordDiagramIndex] = useState<ChordDiagramState>(
    {},
  )
  const [chordSelected, setChordSelected] = useState<string>('')
  const chordsDiagrams = useMemo(() => chords || [], [chords])

  useEffect(() => {
    document.querySelectorAll('span.js-chord-chord')?.forEach(
      (el: HTMLSpanElement) =>
        (el.onclick = () => {
          setChordSelected(el.innerText.trim())
        }),
    )
  }, [selectedTabContent?.htmlTab, chords])

  // Remove diagram when changing tab
  useEffect(() => setChordSelected(''), [selectedTabContent?.url, chords])

  // Toggling diagram
  useEffect(() => {
    if (!chordSelected || !chordDiagramRef) {
      return
    }

    const chordDiagram = chordsDiagrams[chordSelected]
    if (!chordDiagram) {
      return
    }

    chordDiagramRef.current.innerHTML = ''

    const chordBoxOptions = {
      width: 110,
      height: 110,
    }
    const chordBoxReference = new ChordBox(
      chordDiagramRef.current,
      chordBoxOptions,
    )
    if (chordDiagramIndex[chordSelected] === undefined) {
      setChordDiagramIndex((prevValue) => {
        return {
          ...prevValue,
          [chordSelected]: 0,
        }
      })
    }
    const diagramSelectedIndex = chordDiagramIndex[chordSelected]
      ? chordDiagramIndex[chordSelected]
      : 0
    const chordDiagramSelected: UGChord =
      chordsDiagrams[chordSelected][diagramSelectedIndex]
    const position = chordDiagramSelected.fret
    const fretValues = chordDiagramSelected.frets
    const barChordConfiguration = chordDiagramSelected.listCapos[0]
    /* 
    Format UG chords to vexchord
      Vexchords difference with UG :
        First string (E) is index 1 (UG is 0)
        Mute string value is 'x' (UG is -1)
        When using position > 0 : Need to substract position value to all fret values because Vexchords fret index is starting at the position set
        (ex: position is set to 3, i need to set fret value to 1 to get the note on 4th fret => otherwise UG fret values are not referring to position, it will use the value "4" directly )
    */
    const formattedChordsArray: VexchordsChord = fretValues.map(
      (stringElement, index) => {
        const positionValueAjustment = position > 0 ? position - 1 : 0
        const fretValue =
          stringElement === -1 ? 'x' : stringElement - positionValueAjustment
        return [index + 1, fretValue, chordDiagramSelected.fingers[index]]
      },
    )
    const formattedVexchord: VexchordsOptions = {
      name: chordSelected,
      chord: formattedChordsArray,
      position: position,
      barres: barChordConfiguration && [
        {
          toString: barChordConfiguration.startString + 1,
          fromString: barChordConfiguration.lastString + 1,
          fret:
            position > 0
              ? barChordConfiguration.fret - position + 1
              : barChordConfiguration.fret,
        },
      ],
    }

    chordBoxReference.draw(formattedVexchord)
  }, [chordDiagramIndex, chordsDiagrams, chordSelected, toast])

  return (
    <Flex
      position={'fixed'}
      right={'17px'}
      bottom="17px"
      borderRadius={'lg'}
      bg={borderLightColor}
      textAlign="center"
      className="chord--diagram"
      display={!chordSelected ? 'none' : 'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      onClick={() => setChordSelected('')}
      zIndex={1}
    >
      <Flex
        p={2}
        pb={0}
        display={!chordSelected ? 'none' : 'inline-flex'}
        alignItems={'center'}
      >
        <IconButton
          icon={<ChevronLeftIcon />}
          size={'xs'}
          mr={1}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setChordDiagramIndex((prevValue) => {
              return {
                ...prevValue,
                [chordSelected]:
                  prevValue[chordSelected] === 0
                    ? chordsDiagrams[chordSelected].length - 1
                    : prevValue[chordSelected] - 1,
              }
            })
          }}
          aria-label={'Previous diagram'}
        />
        <Text fontSize={'xs'}>
          {chordDiagramIndex[chordSelected] + 1} of{' '}
          {chordsDiagrams[chordSelected]?.length}
        </Text>
        <IconButton
          icon={<ChevronRightIcon />}
          ml={1}
          size={'xs'}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setChordDiagramIndex((prevValue) => {
              return {
                ...prevValue,
                [chordSelected]:
                  prevValue[chordSelected] ===
                  chordsDiagrams[chordSelected].length - 1
                    ? 0
                    : prevValue[chordSelected] + 1,
              }
            })
          }}
          aria-label={'Next diagram'}
        />
      </Flex>
      <Box ref={chordDiagramRef}></Box>
      <Text py={1} as={'b'}>
        {' '}
        {chordSelected}
      </Text>
    </Flex>
  )
}
