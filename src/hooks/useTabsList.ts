import { useQuery } from 'react-query'
const getDatas = async (value: string, type: string, page: number) => {
  const response = await fetch(
    `/api/search?q=${value}&type=${type}&page=${page}`,
  )
  return response.json()
}
export default function useTabsList(value: string, type: string, page: number) {
  return useQuery(
    ['searchTab', value, type, page],
    () => getDatas(value, type, page),
    {
      enabled: value.length > 0 && type.length > 0,
    },
  )
}
