import { underscore } from '../utils/string'
import { validateType, getTabsList } from '../core/tab'
import type {
  ApiRequestSearch,
  ApiArgsSearch,
  ApiResponseSearch,
  Tab,
  TabScrapped,
  PuppeteerOptions,
} from '../../types/tabs'
import puppeteer, { Page } from 'puppeteer'
import {
  PUPPETEER_BLOCK_RESSOURCE_NAME,
  PUPPETEER_BLOCK_RESSOURCE_TYPE,
} from '../../constants'

export async function search(args: ApiArgsSearch): Promise<ApiResponseSearch> {
  args = formatSearchQuery(args)
  const url = 'http://www.ultimate-guitar.com/search.php?' + encodeParams(args)
  console.log(url)
  const tabs = await getTabsList(url, args)
  return tabs
}

export function formatRequestSearch(uri: string): ApiRequestSearch {
  uri = decodeURIComponent(uri)

  let output: ApiRequestSearch = {
    url: uri,
    type: '',
    args: {
      q: '',
      type: 'Tab',
      page: 1,
      value: '',
      search_type: 'title',
      order: '',
    },
  }

  output.type = /^\/(.*)\?/.exec(uri)![1]
  let raw = uri
    .slice(uri.indexOf(output.type) + output.type.length + 1, uri.length)
    .split('&')

  for (let i in raw) {
    let keyVal = raw[i].split('=')
    if (keyVal.length == 2) {
      output.args[keyVal[0]] = keyVal[1]
    }
  }
  return output
}

export function encodeParam(key: string, value: any[]): string {
  if (Array.isArray(value)) {
    return value.map((item) => encodeParam(`${key}[]`, item)).join('&')
  } else {
    return key + '=' + encodeURIComponent(value)
  }
}

export function encodeParams(params: Record<string, any>): string {
  // encode everything
  return Object.keys(params)
    .map((key: string) => {
      return encodeParam(key, params[key])
    })
    .join('&')
    .replace(/%20/g, '+')
}

export function formatSearchQuery(args: ApiArgsSearch): ApiArgsSearch {
  let acceptedParams = ['q', 'type', 'page', 'source']
  let requiredParams = ['q']
  let params: ApiArgsSearch = {
    type: '',
    page: 1,
    value: '',
    // to not evoke suspicion, we try to make the same request as in the ultimate guitar web application
    search_type: 'title',
    order: '',
    q: '',
    source: 'artist_name,song_name',
  }

  // accepted params only
  for (let param in args) {
    let underscored = underscore(param)
    if (acceptedParams.indexOf(underscored) !== -1) {
      params[underscored] = args[param]
    } else {
      delete args[param]
    }
  }
  // required params
  for (let i = 0; i < requiredParams.length; i++) {
    if (Object.keys(params).indexOf(requiredParams[i]) === -1) {
      throw new Error("Query requires param '" + requiredParams[i] + "'.")
    }
  }

  // param 'type' can be a string or an array of string
  if (params.type) {
    if (Array.isArray(params.type)) {
      for (let i = 0; i < params.type.length; i++) {
        params.type[i] = validateType(params.type[i])
      }
    } else {
      params.type = validateType(params.type)
    }
  }
  // Rename `q` to `value`
  params.value = params.q

  return params
}

export function formatTabResult(tab: TabScrapped): Tab {
  return {
    artist: tab.artist_name,
    name: tab.song_name,
    url: tab.tab_url,
    difficulty: tab.difficulty,
    tuning: tab.tuning,
    raw_tabs: tab.raw_tabs,
    htmlTab: tab.htmlTab,
    numberRates: tab.votes,
    type: tab.type,
    slug: tab.tab_url.split('/').splice(-2).join('/'),
    rating: parseFloat(tab.rating.toFixed(2)),
  }
}

//Using puppeteer@6.0 and chrome-aws-lambda@6.0 to not exceed the AWS 50mb limit for the serverless functions
export async function getPuppeteerConf(
  options: PuppeteerOptions = {},
): Promise<{ page: Page; browser: any }> {
  const browser = await puppeteer.launch({
    args: [
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-setuid-sandbox',
      '--disable-speech-api',
      '--disable-sync',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain',
    ],
    defaultViewport:
      options.widthBrowser && options.heightBrowser
        ? {
            width: parseInt(options.widthBrowser) - 50,
            height: parseInt(options.heightBrowser),
          }
        : null,
    headless: 'new',
  })

  const page: Page = await browser.newPage()
  // Block every ressources that we don't need to load
  page.setDefaultNavigationTimeout(4000)
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const requestUrl = request.url().split('?')[0]
    if (
      PUPPETEER_BLOCK_RESSOURCE_TYPE.includes(request.resourceType()) ||
      PUPPETEER_BLOCK_RESSOURCE_NAME.some((resource) =>
        requestUrl.includes(resource),
      )
    ) {
      request.abort()
    } else {
      request.continue()
    }
  })

  return { page, browser }
}
