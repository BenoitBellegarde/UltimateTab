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
} from '@chakra-ui/react'
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import useAppStateContext from '../hooks/useAppStateContext'
import NextLink from 'next/link'
export default function Nav(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()
  const { setSearchValue } = useAppStateContext()
  const router = useRouter()
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Link as={NextLink} href="/" style={{ textDecoration: 'none' }}>
              <Text
                bg="fadebp"
                bgClip="text"
                fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })}
                mr={5}
                fontWeight="extrabold"
                whiteSpace={'nowrap'}
              >
                Ultimate tab
              </Text>
            </Link>
          </Flex>
          <Flex alignItems={'center'} width={'100%'}>
            <InputGroup mr={5}>
              <InputLeftElement h={'100%'} pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>

              <Input
                onChange={(e) => {
                  if (router.pathname !== '/search') {
                    router.push('/search')
                  }
                  setSearchValue(e.target.value)
                }}
                placeholder="Search a song or an artist..."
                size={useBreakpointValue({ base: 'sm', md: 'md' })}
                borderRadius="full"
              />
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
