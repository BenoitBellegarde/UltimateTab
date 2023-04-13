import { ReactNode } from 'react'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}
