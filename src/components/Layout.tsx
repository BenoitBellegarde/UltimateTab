import { Container, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps): JSX.Element {
  const {pathname } = useRouter()
  const flexDirectionContent = (pathname === '/') ? 'row' : 'column'
  return (
    <Container maxW='8xl'>
    <Flex minH={'100vh'} direction={'column'}>
      <Nav />
      <Flex grow={1} direction={flexDirectionContent}>{children}</Flex>
    </Flex>
    </Container>
      
  )
}
