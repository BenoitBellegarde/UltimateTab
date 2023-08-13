import { Box, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'
import { CHORDS } from '../constants'

interface ChordDiagramProps {
  dep: any
}

export default function ChordDiagram({ dep }: ChordDiagramProps): JSX.Element {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const chordDiagramRef = useRef(null)
  const toast = useToast()

  useEffect(() => {
    const showChords = async (el: HTMLSpanElement) => {
      if (typeof CHORDS[el.innerText.trim()] === 'undefined') {
        chordDiagramRef.current.innerHTML = ''
        toast({
          description: 'No diagram found for this chord 😥',
          status: 'info',
          duration: 2000,
        })
        return
      }
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
      .querySelectorAll('span.text-chord')
      ?.forEach((el: HTMLSpanElement) => (el.onclick = () => showChords(el)))
  }, [dep, toast])

  return (
    <Box
      className="chord--diagram"
      borderRadius={'lg'}
      bg={borderLightColor}
      textAlign="center"
      ref={chordDiagramRef}
      position={'fixed'}
      right={'17px'}
      bottom="17px"
      onClick={() => (chordDiagramRef.current.innerHTML = '')}
    ></Box>
  )
}
