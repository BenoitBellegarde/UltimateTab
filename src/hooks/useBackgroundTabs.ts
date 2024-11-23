import { useQuery } from 'react-query'
import { getDatasTab } from './useTabs'

export default function useBackgroundTabs(
  url: string,
  fontSize: number = 100,
  widthBrowser: number,
) {
  return useQuery(
    ['getBackgroundTab', fontSize, widthBrowser],
    async ({ signal }) => getDatasTab(url, fontSize, widthBrowser, signal),
    {
      enabled: url.length > 0,
      cacheTime: 0,
    },
  )
}
