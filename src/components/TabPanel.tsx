import { StarIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  GridItem,
  Icon,
  IconButton,
  Link,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import HTMLReactParser from 'html-react-parser'
import { useEffect, useRef } from 'react'
import { GiGuitarHead } from 'react-icons/gi'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import Difficulty from './Difficulty'
import { CHORDS } from '../constants'
import dynamic from 'next/dynamic'

export default function TabPanel({
  selectedTab,
  isFavorite,
  selectedTabContent,
  isLoading,
  handleClickFavorite,
}) {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')

  const chordDiagramRef = useRef(null)

  useEffect(() => {
    chordDiagramRef.current.innerHTML = ''
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

    document
      .querySelectorAll('span[data-name]')
      ?.forEach((el: HTMLSpanElement) => (el.onclick = () => showChords(el)))
  }, [selectedTabContent])

  return (
    <>
      <GridItem
        h="100%"
        px={5}
        py={3}
        borderBottomStyle={'solid'}
        borderBottomWidth={selectedTabContent && '1px'}
        borderBottomColor={borderLightColor}
        area={'header'}
      >
        <Skeleton
          justifyContent={'space-between'}
          flexDirection="column"
          display={'flex'}
          h="100%"
          isLoaded={!isLoading}
        >
          {selectedTabContent && (
            <>
              <Flex justifyContent={'space-between'}>
                <Box>
                  <Text fontSize={'lg'} as="b">
                    {selectedTabContent.artist}
                  </Text>{' '}
                  {selectedTabContent.song_name}
                </Box>
                <Flex alignItems={'center'}>
                  <StarIcon color={'yellow.400'} mr={'5px'} />{' '}
                  {selectedTab.rating} ({selectedTab.numberRates})
                </Flex>
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Flex fontSize={'sm'}>
                  <Text color={'gray.500'} as="b" mr={1}>
                    Difficulty
                  </Text>{' '}
                  <Difficulty level={selectedTabContent.difficulty} />
                </Flex>{' '}
                <Flex fontSize={'sm'}>
                  <Text color={'gray.500'} as="b" mr={1}>
                    Tuning
                  </Text>{' '}
                  <Icon boxSize={5} as={GiGuitarHead} mr={1} />
                  {selectedTabContent.tuning.join(' ')}
                </Flex>{' '}
              </Flex>
            </>
          )}
        </Skeleton>
      </GridItem>
      <GridItem h="100%" p="5" overflowY={'auto'} area={'main'}>
        <Flex h="100%" w="100%" wrap={'wrap'} justifyContent="center">
          <Skeleton display={'flex'} h="100%" w="100%" isLoaded={!isLoading}>
            {selectedTabContent && (
              <Flex h={'100%'} w="100%">
                {HTMLReactParser(selectedTabContent.htmlTab)}
              </Flex>
            )}
          </Skeleton>
        </Flex>
        <Box
          borderRadius={'lg'}
          bg={borderLightColor}
          textAlign="center"
          ref={chordDiagramRef}
          position={'absolute'}
          right={8}
          bottom="70px"
        ></Box>
      </GridItem>
      <GridItem
        h="100%"
        display={'flex'}
        px={5}
        py={3}
        shadow={'base'}
        area={'footer'}
        borderTopStyle={'solid'}
        borderTopWidth={selectedTabContent && '1px'}
        borderTopColor={borderLightColor}
      >
        <Skeleton
          alignItems={'center'}
          justifyContent={'space-between'}
          display={'flex'}
          h="100%"
          w="100%"
          isLoaded={!isLoading}
        >
          {selectedTabContent && (
            <>
              <Flex>
                <Text fontSize={'sm'}>
                  <Link color="green">Link your Spotify account</Link> to listen
                  the track
                </Text>
              </Flex>
              <Flex>
                <Tooltip
                  placement="left"
                  label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  <IconButton
                    icon={isFavorite ? <RiHeartFill /> : <RiHeartLine />}
                    onClick={handleClickFavorite}
                    colorScheme={isFavorite ? 'red' : 'gray'}
                    variant="ghost"
                    aria-label="Add to favorite"
                  />
                </Tooltip>
              </Flex>
            </>
          )}
        </Skeleton>
      </GridItem>
    </>
  )
}
