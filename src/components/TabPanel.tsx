import { StarIcon } from '@chakra-ui/icons'
import {
  Flex,
  GridItem,
  Icon,
  IconButton,
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

interface TabPanelProps {
  selectedTab: Tab
  isFavorite: boolean
  selectedTabContent: ApiResponseTab
  isLoading: boolean
  handleClickFavorite: MouseEventHandler<HTMLButtonElement>
}

export default function TabPanel({
  isFavorite,
  selectedTabContent,
  isLoading,
  handleClickFavorite,
}: TabPanelProps) {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')

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
          <Flex justifyContent={'space-between'}>
            <Flex alignItems={'center'} pb={0}>
              <Flex alignItems={'baseline'}>
                <Text fontSize={'lg'} as="b" mr={1}>
                  {selectedTabContent?.tab.artist}
                </Text>{' '}
                <Text fontSize={'md'}>{selectedTabContent?.tab.song_name}</Text>
              </Flex>
              <Flex fontSize={'sm'} justifyContent={'start'}>
                <Tooltip
                  placement="right"
                  label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  <IconButton
                    icon={isFavorite ? <RiHeartFill /> : <RiHeartLine />}
                    onClick={handleClickFavorite}
                    colorScheme={isFavorite ? 'red' : 'gray'}
                    variant="ghost"
                    aria-label="Add to favorites"
                    size={'sm'}
                  />
                </Tooltip>
              </Flex>
            </Flex>
            <Flex alignItems={'center'}>
              <StarIcon color={'yellow.400'} mr={'5px'} />{' '}
              {selectedTabContent?.tab.rating} (
              {selectedTabContent?.tab.numberRates})
            </Flex>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Flex fontSize={'sm'}>
              <Text color={'gray.500'} as="b" mr={1}>
                Difficulty
              </Text>{' '}
              <Difficulty level={selectedTabContent?.tab.difficulty} />
            </Flex>{' '}
            <Flex fontSize={'sm'}>
              <Text color={'gray.500'} as="b" mr={1}>
                Tuning
              </Text>{' '}
              <Icon boxSize={5} as={GiGuitarHead} mr={1} />
              {selectedTabContent?.tab.tuning.join(' ')}
            </Flex>{' '}
          </Flex>
        </Skeleton>
      </GridItem>

      <Flex
        p={5}
        h="100%"
        w="100%"
        flexGrow={1}
        alignItems={'stretch'}
        wrap={'wrap'}
        justifyContent="center"
      >
        <Skeleton display={'flex'} w="100%" isLoaded={!isLoading}>
          {/* {selectedTabContent && ( */}
          <Flex h={'100%'} w="100%">
            {selectedTabContent &&
              HTMLReactParser(selectedTabContent?.tab?.htmlTab)}
          </Flex>
          {/* )} */}
        </Skeleton>
      </Flex>
      <ChordDiagram dep={selectedTabContent} />
    </>
  )
}
