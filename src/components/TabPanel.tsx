import { StarIcon } from '@chakra-ui/icons'
import {
  Flex,
  GridItem,
  Icon,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import HTMLReactParser from 'html-react-parser'
import { GiGuitarHead } from 'react-icons/gi'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import Difficulty from './Difficulty'
import ChordDiagram from './ChordDiagram'
import { Tab } from '../types/tabs'
import { MouseEventHandler } from 'react'

interface TabPanelProps {
  selectedTab: Tab
  isFavorite: boolean
  selectedTabContent: Tab
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
          <Flex
            justifyContent={'space-between'}
            flexDirection={useBreakpointValue({ base: 'column', sm: 'row' })}
          >
            <Flex alignItems={'center'} pb={0}>
              <Flex alignItems={'baseline'} py={1}>
                <Text fontSize={'lg'} as="b" mr={1}>
                  {selectedTabContent?.artist}
                </Text>{' '}
                <Text fontSize={'md'}>{selectedTabContent?.name}</Text>
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
              <StarIcon fontSize={'small'} color={'yellow.400'} mr={'5px'} />{' '}
              {selectedTabContent?.rating} ({selectedTabContent?.numberRates})
            </Flex>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            flexDirection={useBreakpointValue({ base: 'column', sm: 'row' })}
          >
            <Flex fontSize={'sm'} py={1}>
              <Text color={'gray.500'} as="b" mr={1}>
                Difficulty
              </Text>{' '}
              <Difficulty level={selectedTabContent?.difficulty} />
            </Flex>{' '}
            <Flex fontSize={'sm'} py={1}>
              <Text color={'gray.500'} as="b" mr={1}>
                Tuning
              </Text>{' '}
              <Icon boxSize={5} as={GiGuitarHead} mr={1} />
              {selectedTabContent?.tuning.join(' ')}
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
            {selectedTabContent && HTMLReactParser(selectedTabContent?.htmlTab)}
          </Flex>
          {/* )} */}
        </Skeleton>
      </Flex>
      <ChordDiagram dep={selectedTabContent} />
    </>
  )
}
