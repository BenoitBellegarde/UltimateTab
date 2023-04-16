import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import Layout from '../components/Layout'
import { AppStateProvider } from '../contexts/AppContext'

import '../styles/styles.scss'
import '@fontsource/poppins/400.css'

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: (props) => ({
      'span[data-name]': {
        cursor: 'pointer',
        color:
          props.colorMode === 'dark'
            ? 'twitter.600 !important'
            : 'twitter.600 !important',
        fontWeight: 'bold',
      },
      'pre, code': {
        fontFamily: `'Poppins Mono', monospace !important`,
        fontSize: 'md !important',
      },
    }),
  },
  fonts: {
    body: `'Poppins', sans-serif`,
  },
})
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AppStateProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppStateProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
