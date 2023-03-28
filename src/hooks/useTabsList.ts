import { useQuery } from 'react-query'
const getDatas = async (value: string, type: string) => {
  const response = await fetch(`/api/search?q=${value}&type=${type}`)
  return response.json()
}
export default function useTabsList(value: string, type: string) {
  return useQuery(['searchTab', value, type], () => getDatas(value, type), {
    enabled: value.length > 0 && type.length > 0,
  })
}
