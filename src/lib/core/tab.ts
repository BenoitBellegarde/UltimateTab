import { getSpotifyAccessToken } from './../api/spotify'
import {
  Tab,
  Pagination,
  ApiResponseTab,
  TabScrapped,
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
    let results: TabScrapped[] = [
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
    const {
      tab_url,
      artist_name,
      song_name,
      rating,
      votes,
      type,
    }: TabScrapped = window.UGAPP.store.page.data.tab
    const tuning: string[] = tab_view?.meta?.tuning?.value?.split(' ') || [
      'E',
      'A',
      'D',
      'G',
      'B',
      'E',
    ]
    const difficulty: string = tab_view?.ug_difficulty || 'unknown'
    const raw_tabs: string = tab_view?.wiki_tab?.content || ''
    const htmlTab: string = document.querySelector('code')?.outerHTML || ''
    const versions: TabScrapped[] = tab_view?.versions.filter((tab : TabScrapped) => tab.type !== 'Official') || []
    let versionsFormatted: Tab[] = versions.map((tabScrapped) => {
      return {
        artist: tabScrapped.artist_name,
        name: tabScrapped.song_name,
        url: tabScrapped.tab_url,
        difficulty: tabScrapped.difficulty,
        numberRates: tabScrapped.votes,
        type: tabScrapped.type,
        slug: tabScrapped.tab_url.split('/').splice(-2).join('/'),
        rating: parseFloat(tabScrapped.rating.toFixed(2)),
      }
    })

    if (Array.isArray(versionsFormatted)) {
      versionsFormatted = versionsFormatted.sort(function (elem1, elem2) {
        return (
          elem2.rating * elem2.numberRates - elem1.rating * elem1.numberRates
        )
      })
    }

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
      versions : versionsFormatted,
    }
  })
  await browser.close()
  const { access_token } = await getSpotifyAccessToken()
  return { tab: tabParsed, spotify_access_token: access_token }
}
