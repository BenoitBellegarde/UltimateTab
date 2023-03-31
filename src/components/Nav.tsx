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
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import NavLink from './NavLink'

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box shadow={'md'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Text
              bgGradient="linear(to-l, #7928CA, #1a94da)"
              bgClip="text"
              fontSize={'lg'}
              mr={5}
              fontWeight="extrabold"
            >
              Ultimate tab
            </Text>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/favorites">Favorites</NavLink>
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
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
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
