import { useQuery } from 'react-query'
import { ApiResponseTab, Tab } from '../types/tabs'
export const getDatasTab = async (url: string): Promise<Tab> => {
  const response = await fetch(
    `/api/tab?q=${url}&width=${document.documentElement.clientWidth}&height=${document.documentElement.clientHeight}`,
  )
  const parsedResponse: ApiResponseTab = await response.json()
  return parsedResponse.tab
}
export default function useTabs(url: string) {
  return useQuery(['getTab', url], () => getDatasTab(url), {
    enabled: url.length > 0,
  })
}
