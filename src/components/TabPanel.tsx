import { ChevronDownIcon, StarIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  ToastId,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import HTMLReactParser from 'html-react-parser'
import { GiGuitarHead } from 'react-icons/gi'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import Difficulty from './Difficulty'
import ChordDiagram from './ChordDiagram'
import { Tab } from '../types/tabs'
import { MouseEventHandler, useEffect, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import useDebounce from '../hooks/useDebounce'

interface TabPanelProps {
  selectedTab: Tab
  isFavorite: boolean
  selectedTabContent: Tab
  isLoading: boolean
  handleClickFavorite: MouseEventHandler<HTMLButtonElement>
  refetchTab: Function
}

export default function TabPanel({
  isFavorite,
  selectedTabContent,
  isLoading,
  handleClickFavorite,
  refetchTab,
}: TabPanelProps) {
  const router = useRouter()
  const widthBrowser = useDebounce<number>(
    typeof document !== 'undefined' ? document.documentElement.clientWidth : 0,
    300,
  )
  console.log(widthBrowser)
  const firstUpdate = useRef<boolean>(true)
  console.log(firstUpdate)

  const flexSongNameDirection = useBreakpointValue({
    base:
      selectedTabContent &&
      selectedTabContent.artist?.length + selectedTabContent.name?.length > 30
        ? 'column'
        : 'row',
    sm: 'row',
  })
  const toast = useToast()
  const refToastId = useRef<ToastId>()
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')

  // Refetch tab when resizing browser or changing orientation to get the updated responsive tab from UG
  if (typeof document !== 'undefined') {
    // Hook executed only in browser to prevent NextJS SSR to return a warning
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      if (!selectedTabContent) return
      if (refToastId.current) {
        toast.close(refToastId.current)
      }

      refToastId.current = toast({
        description: 'Adapting tab to your browser dimensions...',
        status: 'info',
        duration: null,
        isClosable: true,
      })
      refetchTab().then(() => {
        toast.close(refToastId.current)
      })
      // Disabling this effect on the first load of the tab to prevent triggering the toast only because of scrollbar appearing/disappearing
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthBrowser, refetchTab, toast])
  }
  return (
    <>
      <Box
        h="100%"
        px={5}
        py={2}
        borderBottomStyle={'solid'}
        borderBottomWidth={selectedTabContent && '1px'}
        borderBottomColor={borderLightColor}
      >
        <Skeleton
          justifyContent={'space-between'}
          flexDirection="column"
          display={'flex'}
          h="100%"
          isLoaded={!isLoading}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} pb={0}>
              <Flex
                alignItems={'baseline'}
                flexDirection={flexSongNameDirection as 'row' | 'column'}
                py={1}
              >
                <Text fontSize={'lg'} as="b" mr={1}>
                  {selectedTabContent?.artist}
                </Text>{' '}
                <Text fontSize={'md'}>{selectedTabContent?.name}</Text>
              </Flex>
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
                  size={'md'}
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Flex alignItems={'center'} justifyContent={'space-between'} py={1}>
            {
              // Hack with top and relative position to make the star icon perfectly vertically aligned
            }
            <Flex alignItems={'center'}>
              <StarIcon
                fontSize={'sm'}
                color={'yellow.400'}
                position="relative"
                top="-0.05rem"
                mr={'5px'}
              />{' '}
              <Flex>
                {selectedTabContent?.rating} ({selectedTabContent?.numberRates})
              </Flex>
            </Flex>
            {selectedTabContent?.versions.length > 0 && (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="outline"
                  _hover={{
                    bg: 'twitter.300',
                    color: 'white',
                  }}
                  _active={{
                    bg: 'twitter.600',
                    color: 'white',
                  }}
                  size={'sm'}
                  boxShadow="md"
                  fontWeight={'normal'}
                  px="3"
                  py="1"
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={
                    <Icon
                      fontSize={'sm'}
                      color={'yellow.400'}
                      position="relative"
                      top="-0.05rem"
                      as={StarIcon}
                    />
                  }
                >
                  More versions
                </MenuButton>
                <MenuList>
                  {selectedTabContent?.versions?.map((tab) => (
                    <MenuItem
                      onClick={() => {
                        router.push(`/tab/${tab.slug}`)
                      }}
                      key={tab.slug}
                    >
                      <StarIcon
                        fontSize={'sm'}
                        color={'yellow.400'}
                        position="relative"
                        top="-0.05rem"
                        mr={'5px'}
                      />{' '}
                      {tab.rating} ({tab.numberRates})
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Flex
            justifyContent={'space-between'}
            flexDirection={useBreakpointValue({ base: 'column', sm: 'row' })}
          >
            <Flex fontSize={'sm'} py={2}>
              <Text color={'gray.500'} as="b" mr={1}>
                Difficulty
              </Text>{' '}
              <Difficulty level={selectedTabContent?.difficulty} />
            </Flex>{' '}
            <Flex fontSize={'sm'} py={2}>
              <Text color={'gray.500'} as="b" mr={1}>
                Tuning
              </Text>{' '}
              <Icon boxSize={5} as={GiGuitarHead} mr={1} />
              {selectedTabContent?.tuning.join(' ')}
            </Flex>{' '}
          </Flex>
        </Skeleton>
      </Box>

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
          <Flex h={'100%'} w="100%">
            {selectedTabContent && HTMLReactParser(selectedTabContent?.htmlTab)}
          </Flex>
        </Skeleton>
      </Flex>
      <ChordDiagram dep={selectedTabContent} />
    </>
  )
}
