import {
  Tab,
  Pagination,
  SearchScrapped,
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
    let results: SearchScrapped[] = []
    if (data.other_tabs) {
      results = results.concat(data.other_tabs)
    }
    if (data.results) {
      results = results.concat(data.results)
    }
    const pagination: Pagination = {
      current: data.pagination.current,
      total: data.pagination.total,
    }
    let tabs: Tab[] = []
    results.forEach((result: SearchScrapped) => {
      if (
        result.marketing_type ||
        ['Pro', 'Power', 'Official', 'Drums'].includes(result.type)
      ) {
        return
      }
      if (result.type === 'Ukulele Chords') {
        result.type = 'Ukulele'
      }
      if (result.type === 'Bass Tabs') {
        result.type = 'Bass'
      }
      const tab: Tab = {
        artist: result.artist_name,
        name: result.song_name,
        url: result.tab_url,
        rating: parseFloat(result.rating.toFixed(2)),
        numberRates: result.votes,
        type: result.type,
      }
      tabs.push(tab)
    })

    const response: ApiResponseSearch = { results: tabs, pagination }
    return response
  })

  await browser.close()
  return tabsParsed
}

export async function getTab(url: string) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)
  const tabParsed = await page.evaluate(() => {
    const tab_view = window.UGAPP.store.page.data.tab_view
    const tab = window.UGAPP.store.page.data.tab
    let htmlTab
    let tuning = tab_view && tab_view.meta ? tab_view.meta.tuning : ''
    let difficulty = tab_view && tab_view.meta ? tab_view.meta.difficulty : ''

    if (!tuning) {
      tuning = ['E', 'A', 'D', 'G', 'B', 'E']
    } else {
      tuning = tuning.value.split(' ')
    }

    if (!difficulty) {
      difficulty = 'unknown'
    }

    return {
      artist: tab.artist_name,
      song_name: tab.song_name,
      tab_url: tab.tab_url,
      difficulty: difficulty,
      tuning: tuning,
      raw_tabs: tab_view.wiki_tab.content,
      htmlTab: document.querySelector('code').outerHTML,
    }
  })

  await browser.close()
  return tabParsed
}
