import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import Layout from '../components/Layout'
import { AppStateProvider } from '../contexts/AppContext'
import { extendedTheme } from '../theme'
import '@fontsource/poppins/400.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={extendedTheme}>
        <AppStateProvider>
          <Layout>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
            </Head>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </AppStateProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
