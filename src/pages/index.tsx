import {
  Flex,
  Text,
  Heading,
  Stack,
  useBreakpointValue,
  Button,
  Image,
  Fade,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          Ultimate Tab - Browse every guitar tabs from Ultimate Guitar with an
          ads-free, enhanced and responsive interface.
        </title>
      </Head>
      <Fade style={{ display: 'flex', flexGrow: '1' }} in={true}>
        <Flex w={'100%'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'fadebp',
                    zIndex: -1,
                    opacity: 0.7,
                  }}
                >
                  100% ads-free,
                </Text>
                <br />{' '}
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'fadebp',
                    zIndex: -1,
                    opacity: 0.7,
                  }}
                >
                  100% responsive,
                </Text>
                <br />{' '}
                <Text color={'blue.400'} as={'span'}>
                  Ultimate guitar tabs
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                Browse every guitar tabs from Ultimate Guitar with an ads-free,
                enhanced and responsive interface.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  colorScheme={'transparent'}
                  rounded={'full'}
                  bg={'fadebp'}
                  color={'white'}
                  onClick={() => router.push('/search')}
                  _hover={{
                    opacity: 0.8,
                  }}
                >
                  Get started
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex
            p={useBreakpointValue({ base: 0, md: 8 })}
            flex={1}
            align={'center'}
            justify={'center'}
          >
            <Image
              alt={'Login Image'}
              objectFit={useBreakpointValue({ base: 'contain', md: 'cover' })}
              style={{
                aspectRatio: useBreakpointValue({
                  base: '16/9',
                  md: 'initial',
                }),
              }}
              h={useBreakpointValue({ base: '90%', md: '50%', lg: '60%' })}
              src={'home-illustration.svg'}
            />
          </Flex>
        </Flex>
      </Fade>
    </>
  )
}
