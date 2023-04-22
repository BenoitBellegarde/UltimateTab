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
import { GiGuitarHead } from 'react-icons/gi'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import Difficulty from './Difficulty'
import ChordDiagram from './ChordDiagram'
import { ApiResponseTab, Tab, TabScrapped } from '../types/tabs'
import { MouseEventHandler } from 'react'
import SongPlayer from './SongPlayer'

interface TabPanelProps {
  selectedTab: Tab
  isFavorite: Boolean
  selectedTabContent: ApiResponseTab
  isLoading: Boolean
  handleClickFavorite: MouseEventHandler<HTMLButtonElement>
}

export default function TabPanel({
  selectedTab,
  isFavorite,
  selectedTabContent,
  isLoading,
  handleClickFavorite,
}: TabPanelProps) {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const spotifyAccessToken =
    selectedTabContent &&
    typeof selectedTabContent?.spotify_access_token === 'string' &&
    selectedTabContent?.spotify_access_token

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
                    {selectedTabContent.tab.artist}
                  </Text>{' '}
                  {selectedTabContent.tab.song_name}
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
                  <Difficulty level={selectedTabContent.tab.difficulty} />
                </Flex>{' '}
                <Flex fontSize={'sm'}>
                  <Text color={'gray.500'} as="b" mr={1}>
                    Tuning
                  </Text>{' '}
                  <Icon boxSize={5} as={GiGuitarHead} mr={1} />
                  {selectedTabContent.tab.tuning.join(' ')}
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
                {HTMLReactParser(selectedTabContent.tab.htmlTab)}
              </Flex>
            )}
          </Skeleton>
        </Flex>
        <ChordDiagram dep={selectedTabContent} />
      </GridItem>
      <GridItem
        h="100%"
        display={'flex'}
        px={5}
        py={3}
        shadow={selectedTabContent && 'base'}
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
              <Flex w={'100%'}>
                {spotifyAccessToken ? (
                  <SongPlayer
                    songName={`${selectedTabContent.tab.artist} ${selectedTabContent.tab.song_name}`}
                    accessToken={spotifyAccessToken}
                  />
                ) : (
                  <Text fontSize={'sm'}>
                    <Link color="green">Link your Spotify account</Link> to
                    listen the track
                  </Text>
                )}
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
