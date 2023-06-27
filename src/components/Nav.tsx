import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import NavLink from './NavLink'
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
                bgGradient="linear(to-l, #7928CA, #1a94da)"
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
                  router.push('/search')
                  setSearchValue(e.target.value)
                }}
                placeholder="Search a song or an artist..."
                size={useBreakpointValue({ base: 'sm', md: 'md' })}
                borderRadius="full"
              />
            </InputGroup>
            {/* <NavLink href="/">Home</NavLink> */}
            {/* <NavLink href="/favorites">Favorites</NavLink> */}
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button size={useBreakpointValue({ base: 'sm', md: 'md' })} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {/* <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
