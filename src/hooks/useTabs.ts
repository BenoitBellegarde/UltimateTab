import { useQuery } from 'react-query'
const getDatasTab = async (url: string) => {
  const response = await fetch(`/api/tab?q=${url}`)
  return response.json()
}
export default function useTabs(url: string) {
  return useQuery(['getTab', url], () => getDatasTab(url), {
    enabled: url.length > 0,
  })
}
