import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'

export const extendedTheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      'span[data-name]': {
        cursor: 'pointer',
        color: 'twitter.600 !important',
        fontWeight: 'bold',
      },
      'pre, code': {
        fontFamily: `'Poppins Mono', monospace !important`,
        fontSize: 'md !important',
      },
      '.PlayerRSWP': {
        bgColor: props.colorMode === 'dark' && '#1a202c !important',
      },
      '.slider__thumb,.volume__thumb': {
        bgColor: props.colorMode === 'dark' && 'twitter.600 !important',
      },
      '.rswp_progress,.rswp_duration,._ControlsButtonsRSWP,._VolumeInlineRSWP,._DevicesRSWP button,._ContentRSWP a':
        {
          color: props.colorMode === 'dark' && 'gray.300  !important',
        },
      '._ContentWrapperRSWP path': {
        fill: props.colorMode === 'dark' && 'gray.300  !important',
      },
      '.chord--diagram circle, .chord--diagram rect': {
        fill: props.colorMode === 'dark' && 'twitter.600 !important',
        stroke: props.colorMode === 'dark' && 'twitter.600 !important',
      },
      '.chord--diagram text': {
        stroke: props.colorMode === 'dark' && 'gray.400 !important',
      },
    }),
  },
  fonts: {
    body: `'Poppins', sans-serif`,
  },
})
