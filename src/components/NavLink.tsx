import { Link } from '@chakra-ui/react'
import { ReactNode } from 'react'
import NextLink from 'next/link'
import { useColorModeValue } from '@chakra-ui/react'

interface NavLinkProps {
  children: ReactNode
  href: string
}
export default function NavLink({ children, href }: NavLinkProps): JSX.Element {
  return (
    <Link
      as={NextLink}
      href={href}
      px={4}
      fontSize={'lg'}
      display={'flex'}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  )
}
