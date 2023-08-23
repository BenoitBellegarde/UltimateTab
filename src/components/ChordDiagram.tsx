import {
  Box,
  IconButton,
  useColorModeValue,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import useAppStateContext from '../hooks/useAppStateContext'
import ChordBox from '../../node_modules/vexchords/chordbox'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface ChordDiagramProps {
  dep: any
}

export default function ChordDiagram({ dep }: ChordDiagramProps): JSX.Element {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const chordDiagramRef = useRef(null)
  const toast = useToast()
  const { selectedTabContent } = useAppStateContext()
  const [chordDiagramIndex, setChordDiagramIndex] = useState<any>({})
  const [chordSelected, setChordSelected] = useState<string>('')
  console.log(chordDiagramIndex)
  useEffect(() => {
    chordDiagramRef.current.innerHTML = ''
    document.querySelectorAll('span.text-chord')?.forEach(
      (el: HTMLSpanElement) =>
        (el.onclick = () => {
          setChordSelected(el.innerText.trim())
        }),
    )
  }, [dep, toast])
  console.log(chordSelected)
  const chordsDiagrams = selectedTabContent?.chordsDiagrams || []
  if (chordSelected && chordDiagramRef !== null) {
    if (chordsDiagrams[chordSelected] === undefined) {
      chordDiagramRef.current.innerHTML = ''
      toast({
        description: 'No diagram found for this chord 😥',
        status: 'info',
        duration: 2000,
      })
      return
    }
    chordDiagramRef.current.innerHTML = ''
    const chord = new ChordBox(chordDiagramRef.current, {
      width: 110,
      height: 120,
    })
    const chordName = chordSelected
    // Format UG chord to vexchord
    if (chordDiagramIndex[chordName] === undefined) {
      setChordDiagramIndex((prevValue) => {
        return {
          ...prevValue,
          [chordName]: 0,
        }
      })
    }
    const chordIndex = chordDiagramIndex[chordSelected]
      ? chordDiagramIndex[chordSelected]
      : 0
    const chordIndexDiagram = chordsDiagrams[chordSelected][chordIndex]
    const formattedChordArray = chordIndexDiagram.frets.map(
      (stringElement, index) => {
        const listCapoAdaptation =
          chordIndexDiagram.fret > 0 ? chordIndexDiagram.fret - 1 : 0
        const valueFret =
          stringElement === -1 ? 'x' : stringElement - listCapoAdaptation
        return [index + 1, valueFret, chordIndexDiagram.fingers[index]]
      },
    )
    const formattedVexchord = {
      name: chordSelected,
      chord: formattedChordArray,
      position: chordIndexDiagram.fret,
      barres: chordIndexDiagram.listCapos.length > 0 && [
        {
          toString: chordIndexDiagram.listCapos[0].startString + 1,
          fromString: chordIndexDiagram.listCapos[0].lastString + 1,
          fret:
            chordIndexDiagram.listCapos[0].fret - chordIndexDiagram.fret + 1,
        },
      ],
    }
    console.log(formattedVexchord)
    chord.draw(formattedVexchord)
  }

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
      <Text as={'b'}> {chordSelected}</Text>
    </Flex>
  )
}
