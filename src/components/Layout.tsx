import { Container, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode, useRef } from 'react'
import Backdrop from './Backdrop'
import Footer from './Footer'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps): JSX.Element {
  const { pathname } = useRouter()
  const refBackdrop = useRef<HTMLDivElement>(null)
  const flexDirectionContent = pathname === '/' ? 'row' : 'column'
  return (
    <>
      <Backdrop refBackdrop={refBackdrop} />
      <Container maxW="8xl">
        <Flex minH={'100vh'} direction={'column'}>
          <Nav refBackdrop={refBackdrop} />
          <Flex grow={1} direction={flexDirectionContent}>
            {children}
          </Flex>
          <Footer></Footer>
        </Flex>
      </Container>
    </>
  )
}
