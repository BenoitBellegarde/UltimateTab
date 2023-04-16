import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import Layout from '../components/Layout'
import { AppStateProvider } from '../contexts/AppContext'
import { extendedTheme } from '../theme'
import '../styles/styles.scss'
import '@fontsource/poppins/400.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={extendedTheme}>
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
