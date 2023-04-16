import { useContext } from 'react'
import { AppStateContext } from '../contexts/AppContext'

export default function useAppStateContext() {
  return useContext(AppStateContext)
}
