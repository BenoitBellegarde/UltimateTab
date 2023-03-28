import { underscore } from '../utils/string'
import { validateType, getTabsList } from '../core/tab'
import type { ApiRequestSearch, ApiArgsSearch } from '../../types/tabs'

export async function search(args: ApiArgsSearch) {
  args = formatSearchQuery(args)
  const url = 'http://www.ultimate-guitar.com/search.php?' + encodeParams(args)
  console.log(url)
  const tabs = await getTabsList(url)
  return tabs
}

export function formatRequest(uri: string): ApiRequestSearch {
  uri = decodeURIComponent(uri)

  let output = {
    url: uri,
    type: '',
    args: {
      q: '',
      type: 'Tab',
      page: 1,
      value: '',
      search_type: 'title',
      order: '',
    },
  }

  output.type = /^\/(.*)\?/.exec(uri)[1]
  let raw = uri
    .slice(uri.indexOf(output.type) + output.type.length + 1, uri.length)
    .split('&')

  for (let i in raw) {
    let keyVal = raw[i].split('=')
    if (keyVal.length == 2) {
      output.args[keyVal[0]] = keyVal[1]
    }
  }
  return output
}

export function encodeParam(key, value) {
  if (Array.isArray(value)) {
    return value.map((item) => encodeParam(`${key}[]`, item)).join('&')
  } else {
    return key + '=' + encodeURIComponent(value)
  }
}

export function encodeParams(params) {
  // encode everything
  return Object.keys(params)
    .map((key) => {
      return encodeParam(key, params[key])
    })
    .join('&')
    .replace(/%20/g, '+')
}

export function formatSearchQuery(q: ApiArgsSearch): ApiArgsSearch {
  let acceptedParams = ['q', 'type', 'page']
  let requiredParams = ['q']
  let params = {
    type: '',
    page: 1,
    value: '',
    // to not evoke suspicion, we try to make the same request as in the ultimate guitar web application
    search_type: 'title',
    order: '',
    q: '',
  }

  // accepted params only
  for (let param in q) {
    let underscored = underscore(param)
    if (acceptedParams.indexOf(underscored) !== -1) {
      params[underscored] = q[param]
    } else {
      delete q[param]
    }
  }
  // required params
  for (let i = 0; i < requiredParams.length; i++) {
    if (Object.keys(params).indexOf(requiredParams[i]) === -1) {
      throw new Error("Query requires param '" + requiredParams[i] + "'.")
    }
  }

  // param 'type' can be a string or an array of string
  if (params.type) {
    if (Array.isArray(params.type)) {
      for (let i = 0; i < params.type.length; i++) {
        params.type[i] = validateType(params.type[i])
      }
    } else {
      params.type = validateType(params.type)
    }
  }
  // Rename `q` => `value`
  params.value = params.q

  return params
}
