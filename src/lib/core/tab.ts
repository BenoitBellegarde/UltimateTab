import { getSpotifyAccessToken } from './../api/spotify'
import {
  Tab,
  Pagination,
  ApiResponseTab,
  TabScrapped,
  UGChordCollection,
  ApiArgsSearch,
} from './../../types/tabs'
import { TAB_TYPES_VALUES } from '../../constants'
import { ApiResponseSearch } from '../../types/tabs'
import { getPuppeteerConf } from '../api/request'
import sanitizeHtml from 'sanitize-html'

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

export async function getTabsList(
  url: string,
  args: ApiArgsSearch,
): Promise<ApiResponseSearch> {
  const { page, browser } = await getPuppeteerConf()
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    const source = args.source
    const q = args.q
    const tabsParsed: ApiResponseSearch = await page.evaluate(
      ({ source, q }) => {
        const data = window.UGAPP.store.page.data
        let results: TabScrapped[] = [
          ...(data?.other_tabs || []),
          ...(data?.results || []),
        ]

        const pagination: Pagination = {
          current: data.pagination.current,
          total: data.pagination.total,
        }
        const tabs: Tab[] = results
          .filter((result) => {
            const isTypeExcluded =
              !result.marketing_type &&
              !['Pro', 'Power', 'Official', 'Drums', 'Video'].includes(
                result.type,
              )

            if (source === 'artist_name') {
              return (
                isTypeExcluded &&
                result.artist_name &&
                result.artist_name.toLowerCase().includes(q.toLowerCase())
              )
            } else if (source === 'song_name') {
              return (
                isTypeExcluded &&
                result.song_name &&
                result.song_name.toLowerCase().includes(q.toLowerCase())
              )
            } else {
              return isTypeExcluded
            }
          })
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
      },
      { source, q },
    )
    await browser.close()
    return tabsParsed
  } catch (error) {
    console.log(error)
  } finally {
    await browser.close()
  }
}

export async function getTab(
  url: string,
  width?: string,
  height?: string,
): Promise<ApiResponseTab> {
  const getTabinfo = async () => {
    const { page, browser } = await getPuppeteerConf({
      widthBrowser: width,
      heightBrowser: height,
    })
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' })

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
        const chordsDiagrams: UGChordCollection[] = tab_view?.applicature || []
        const versions: TabScrapped[] =
          tab_view?.versions.filter(
            (tab: TabScrapped) => tab.type !== 'Official',
          ) || []
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
              elem2.rating * elem2.numberRates -
              elem1.rating * elem1.numberRates
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
          numberRates: votes,
          type: type,
          slug: tab_url.split('/').splice(-2).join('/'),
          rating: parseFloat(rating.toFixed(2)),
          versions: versionsFormatted,
          chordsDiagrams,
        }
      })
      await browser.close()
      return tabParsed
    } catch (error) {
      console.log(error)
    } finally {
      await browser.close()
    }
  }

  const getResponsiveTab = async () => {
    const { page, browser } = await getPuppeteerConf({
      widthBrowser: width,
      heightBrowser: height,
    })
    try {
      //Scrapping as a mobile to get responsive tab content
      //We cannot scrap everything directly as a mobile because a lot of infos are missing in mobile view in the window UGAPP variable (versions,votes,etc...)
      //Replacing Linux word in userAgent because there's an issue with UG when having a Linux userAgent, returning an error page
      await page.setUserAgent(
        (await browser.userAgent()).replace('Linux', 'Windows') +
          ' Mobile Safari iPhone',
      )
      await page.goto(url, { waitUntil: 'domcontentloaded' })

      const tabResponsive: string = await page.evaluate(() => {
        return document.querySelector('pre')?.outerHTML || ''
      })
      await browser.close()
      return sanitizeHtml(tabResponsive, {
        allowedAttributes: {
          span: ['class'],
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      await browser.close()
    }
  }
  const [tabParsed, tabResponsive] = await Promise.all([
    getTabinfo(),
    getResponsiveTab(),
  ])
  tabParsed.htmlTab = tabResponsive
  const { access_token } = await getSpotifyAccessToken()
  return { tab: tabParsed, spotify_access_token: access_token }
}
