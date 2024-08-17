// Puppeteer : Block useless ressources type like fonts, images etc.
export const PUPPETEER_BLOCK_RESSOURCE_TYPE = [
  'beacon',
  'csp_report',
  'font',
  'image',
  'imageset',
  'manifest',
  'xhr',
  'fetch',
  'other',
  'ping',
  'media',
  'object',
  'texttrack',
  'stylesheet',
]
// Puppeteer : Block useless ressources by domains, like google-analytics etc.
export const PUPPETEER_BLOCK_RESSOURCE_NAME = [
  'adition',
  'adzerk',
  'analytics',
  'cdn.api.twitter',
  'clicksor',
  'clicktale',
  'doubleclick',
  'exelator',
  'facebook',
  'fontawesome',
  'google',
  'google-analytics',
  'googletagmanager',
  'mixpanel',
  'optimizely',
  'quantserve',
  'sharethrough',
  'tiqcdn',
  'zedo',
]

export const TAB_TYPES = {
  All: 'All',
  Tab: 'Tab',
  Chords: 'Chords',
  Bass: 'Bass',
  Ukulele: 'Ukulele',
}

export const TAB_TYPES_VALUES = {
  All: 0,
  Tab: 200,
  Chords: 300,
  Bass: 400,
  Ukulele: 800,
}

export const TAB_TYPES_COLORS = {
  Tabs: 'green',
  Chords: 'purple',
  Bass: 'red',
  Ukulele: 'orange',
}

export const TAB_SOURCES = {
  Artist: 'artist_name',
  Song: 'song_name',
}
