import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  useBreakpointValue,
  useColorModeValue,
  LinkBox,
} from '@chakra-ui/react'
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import useAppStateContext from '../hooks/useAppStateContext'
import NextLink from 'next/link'
import useAutocomplete from '../hooks/useAutocomplete'
import { MutableRefObject, useRef, useState } from 'react'
export default function Nav({
  refBackdrop,
}: {
  refBackdrop: MutableRefObject<HTMLDivElement>
}): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()
  const { searchValue, setSearchValue } = useAppStateContext()
  const { data: dataAC } = useAutocomplete(searchValue)
  const router = useRouter()
  const refInput = useRef<HTMLInputElement>(null)
  const titleHeader = useBreakpointValue({ base: 'Ut', md: 'Ultimate tab' })
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const fontSizeSuggestions = useBreakpointValue({ base: 'sm', md: 'md' })
  const marginIconSearch = useBreakpointValue({ base: 2, md: 4 })
  const [inputFocus, setInputFocus] = useState<boolean>(false)
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Link as={NextLink} href="/" style={{ textDecoration: 'none' }}>
              <Text
                bg="fadebp"
                bgClip="text"
                fontSize={useBreakpointValue({ base: 'xl', md: 'xl' })}
                mr={4}
                fontWeight="extrabold"
                whiteSpace={'nowrap'}
              >
                {titleHeader}
              </Text>
            </Link>
          </Flex>
          <Flex alignItems={'center'} width={'100%'}>
            <InputGroup
              size={useBreakpointValue({ base: 'sm', md: 'md' })}
              mr={5}
              zIndex={1}
            >
              <InputLeftElement
                h={'100%'}
                cursor={'pointer'}
                onClick={() =>
                  router.pathname !== '/search' && router.push('/search')
                }
              >
                <SearchIcon color="gray.300" />
              </InputLeftElement>

              <Input
                ref={refInput}
                onChange={(e) => {
                  if (router.pathname !== '/search') {
                    router.push('/search')
                  }
                  setSearchValue(e.target.value)
                }}
                onFocus={() => {
                  setInputFocus(true)
                  refBackdrop.current.style.display = 'block'
                }}
                onBlur={() => {
                  setInputFocus(false)
                  refBackdrop.current.style.display = 'none'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    refInput.current.blur()
                    setInputFocus(false)
                    refBackdrop.current.style.display = 'none'
                  }
                }}
                placeholder="Search a song or an artist..."
                borderRadius={!inputFocus && 'full'}
                bg={'var(--chakra-colors-chakra-body-bg)'}
                value={searchValue}
              />
              <Box
                position={'absolute'}
                top="100%"
                left={0}
                right={0}
                borderWidth={dataAC ? 2 : 0}
                borderColor={borderColor}
                shadow={'md'}
                display={inputFocus ? 'block' : 'none'}
                bg={'var(--chakra-colors-chakra-body-bg)'}
              >
                {dataAC?.map((result, index) => (
                  <LinkBox
                    className="tab-result"
                    key={index}
                    onClick={(e) => {
                      if (router.pathname !== '/search') {
                        router.push('/search')
                      }
                      setSearchValue(
                        result.charAt(0).toUpperCase() + result.slice(1),
                      )
                      refInput.current.blur()
                    }}
                    // Disable blur when clicking on suggestion, manually blur the input onClick event to setSearchValue before dismissing suggestions box
                    // https://stackoverflow.com/a/57630197
                    onMouseDown={(e) => {
                      e.preventDefault()
                    }}
                    _hover={{
                      bg: 'twitter.400',
                      color: 'white',
                      opacity: 1,
                    }}
                    as="div"
                    p="2"
                    m="0"
                    cursor={'pointer'}
                    width={'100%'}
                    rounded={0}
                    display={'flex'}
                    flexGrow={'1'}
                    justifyContent={'start'}
                    alignItems="center"
                    boxShadow="xs"
                    fontSize={fontSizeSuggestions}
                    transition="background-color 0.2s ease 0s"
                  >
                    <SearchIcon mr={marginIconSearch} />
                    {result.charAt(0).toUpperCase() + result.slice(1)}
                  </LinkBox>
                ))}
              </Box>
            </InputGroup>
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button
                size={useBreakpointValue({ base: 'sm', md: 'md' })}
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
