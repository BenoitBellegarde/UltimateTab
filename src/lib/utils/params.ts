import { ReadonlyURLSearchParams } from 'next/navigation'

export function getSearchObjectParameters(
  searchParams: ReadonlyURLSearchParams,
  newValues: { [key: string]: string | number },
): { [key: string]: string | number } {
  const object = { ...Object.fromEntries(searchParams.entries()), ...newValues }
  const defaultVals = {
    q: '',
    type: 'All',
    page: 1,
  }
  return {
    ...defaultVals,
    ...object,
  }
}
