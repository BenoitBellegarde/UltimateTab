import { getSpotifyAccessToken } from './../api/spotify'
import {
  Tab,
  Pagination,
  SearchScrapped,
  ApiResponseTab,
} from './../../types/tabs'
import { TAB_TYPES_VALUES } from '../../constants'
import { Page } from 'puppeteer-core'
import { ApiResponseSearch } from '../../types/tabs'
import { getPuppeteerConf } from '../api/request'

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
  const browser = await getPuppeteerConf()
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
          !['Pro', 'Power', 'Official', 'Drums', 'Video'].includes(result.type),
      )
      .map((result) => ({
        artist: result.artist_name,
        name: result.song_name,
        url: result.tab_url,
        slug: result.tab_url.split('/').splice(-2).join('/'),
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
  const browser = await getPuppeteerConf()
  const page: Page = await browser.newPage()
  await page.goto(url)

  const tabParsed: Tab = await page.evaluate(() => {
    const { tab_view } = window.UGAPP.store.page.data
    const { tab_url, artist_name, song_name, rating, votes, type } =
      window.UGAPP.store.page.data.tab
    const tuning = tab_view?.meta?.tuning?.value?.split(' ') || [
      'E',
      'A',
      'D',
      'G',
      'B',
      'E',
    ]
    const difficulty = tab_view?.ug_difficulty || 'unknown'
    const raw_tabs = tab_view?.wiki_tab?.content || ''
    const htmlTab = document.querySelector('code')?.outerHTML || ''

    return {
      artist: artist_name,
      name: song_name,
      url: tab_url,
      difficulty,
      tuning,
      raw_tabs,
      htmlTab,
      numberRates: votes,
      type: type,
      slug: tab_url.split('/').splice(-2).join('/'),
      rating: parseFloat(rating.toFixed(2)),
    }
  })
  await browser.close()
  const { access_token } = await getSpotifyAccessToken()
  return { tab: tabParsed, spotify_access_token: access_token }
}
