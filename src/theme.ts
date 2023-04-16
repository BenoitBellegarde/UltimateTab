import { extendTheme } from '@chakra-ui/react'

export const extendedTheme = extendTheme({
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
