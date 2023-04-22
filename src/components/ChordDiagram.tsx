import { Box, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { CHORDS } from '../constants'

interface ChordDiagramProps {
  dep: any
}

export default function ChordDiagram({ dep }: ChordDiagramProps): JSX.Element {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const chordDiagramRef = useRef(null)

  useEffect(() => {
    const showChords = async (el: HTMLSpanElement) => {
      const ChordBox = (await import('vexchords')).ChordBox
      chordDiagramRef.current.innerHTML = ''
      const chord = new ChordBox(chordDiagramRef.current, {
        width: 100,
        height: 110,
      })
      chord.draw(CHORDS[el.innerText.trim()])
      const strong = document.createElement('strong')
      strong.append(el.innerText.trim())
      chordDiagramRef.current.append(strong)
    }
    chordDiagramRef.current.innerHTML = ''
    document
      .querySelectorAll('span[data-name]')
      ?.forEach((el: HTMLSpanElement) => (el.onclick = () => showChords(el)))
  }, [dep])

  return (
    <Box
      className="chord--diagram"
      borderRadius={'lg'}
      bg={borderLightColor}
      textAlign="center"
      ref={chordDiagramRef}
      position={'absolute'}
      right={8}
      bottom="90px"
    ></Box>
  )
}
