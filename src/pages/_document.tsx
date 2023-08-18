// pages/_document.js
import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { extendedTheme } from '../theme'

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="author" content="Benoit Bellegarde" />
        <meta
          name="keywords"
          content="Ultimate, Tab, scrapped, guitar, ads, free"
        />
        <meta
          name="description"
          content="Browse every guitar tabs from Ultimate Guitar with an ads-free, enhanced and responsive interface."
        ></meta>
      </Head>
      <body>
        <ColorModeScript initialColorMode={extendedTheme.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
