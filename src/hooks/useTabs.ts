import { useQuery } from 'react-query'
import { TabScrapped } from '../types/tabs'
const getDatasTab = async (url: string): Promise<TabScrapped> => {
  const response = await fetch(`/api/tab?q=${url}`)
  return response.json()
}
export default function useTabs(url: string) {
  return useQuery(['getTab', url], () => getDatasTab(url), {
    enabled: url.length > 0,
  })
}
