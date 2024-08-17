import { ReadonlyURLSearchParams } from 'next/navigation'
import { TAB_SOURCES } from '../../constants'

export function getSearchObjectParameters(
  searchParams: ReadonlyURLSearchParams,
  newValues: { [key: string]: string | number },
): { [key: string]: string | number } {
  const object = { ...Object.fromEntries(searchParams.entries()), ...newValues }
  delete object['slug']
  const defaultVals = {
    q: '',
    type: 'All',
    page: 1,
    source: Object.values(TAB_SOURCES).join(','),
  }
  return {
    ...defaultVals,
    ...object,
  }
}
