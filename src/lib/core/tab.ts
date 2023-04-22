import { getSpotifyAccessToken } from './../api/spotify'
import {
  Tab,
  Pagination,
  SearchScrapped,
  TabScrapped,
  ApiResponseTab,
} from './../../types/tabs'
import { TAB_TYPES_VALUES } from '../../constants'
import puppeteer, { Page } from 'puppeteer'
import { ApiResponseSearch } from '../../types/tabs'

export function validateType(type: string): string {
  if (type in TAB_TYPES_VALUES) {
    return TAB_TYPES_VALUES[type]
  } else {
    throw new Error(
      `Unknown type '${type}'. Accepted types are: '${Object.keys(
        TAB_TYPES_VALUES,
      ).join("', '")}'`,
    )
  }
}

export async function getTabsList(url: string): Promise<ApiResponseSearch> {
  const browser = await puppeteer.launch()
  const page: Page = await browser.newPage()

  await page.goto(url)
  const tabsParsed: ApiResponseSearch = await page.evaluate(() => {
    const data = window.UGAPP.store.page.data
    let results: SearchScrapped[] = [
      ...(data.other_tabs || []),
      ...(data.results || []),
    ]
    const pagination: Pagination = {
      current: data.pagination.current,
      total: data.pagination.total,
    }
    const tabs: Tab[] = results
      .filter(
        (result) =>
          !result.marketing_type &&
          !['Pro', 'Power', 'Official', 'Drums'].includes(result.type),
      )
      .map((result) => ({
        artist: result.artist_name,
        name: result.song_name,
        url: result.tab_url,
        rating: parseFloat(result.rating.toFixed(2)),
        numberRates: result.votes,
        type:
          result.type === 'Ukulele Chords'
            ? 'Ukulele'
            : result.type === 'Bass Tabs'
            ? 'Bass'
            : result.type,
      }))

    const response: ApiResponseSearch = { results: tabs, pagination }
    return response
  })

  await browser.close()
  return tabsParsed
}

export async function getTab(url: string): Promise<ApiResponseTab> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url)

  const tabParsed: TabScrapped = await page.evaluate(() => {
    const { tab_view } = window.UGAPP.store.page.data
    const { tab_url, artist_name, song_name } = window.UGAPP.store.page.data.tab
    const tuning = tab_view?.meta?.tuning?.value?.split(' ') || [
      'E',
      'A',
      'D',
      'G',
      'B',
      'E',
    ]
    const difficulty = tab_view?.meta?.difficulty || 'unknown'
    const raw_tabs = tab_view?.wiki_tab?.content || ''
    const htmlTab = document.querySelector('code')?.outerHTML || ''

    return {
      artist: artist_name,
      song_name,
      tab_url,
      difficulty,
      tuning,
      raw_tabs,
      htmlTab,
    }
  })
  await browser.close()
  const { access_token } = await getSpotifyAccessToken()
  return { tab: tabParsed, spotify_access_token: access_token }
}
