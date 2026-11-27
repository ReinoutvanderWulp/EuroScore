import {createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

interface ThemeContextValue {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
  loaded: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const isPreference = (value: string | null): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system'

export const ThemePreferenceProvider: FunctionComponent<{children: ReactNode}> = ({children}) => {
  const [preference, setPreferenceState] = useState<ThemePreference>('light')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(stored => {
        if (isPreference(stored)) setPreferenceState(stored)
      })
      .catch(() => undefined)
      .finally(() => setLoaded(true))
  }, [])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => undefined)
  }, [])

  return <ThemeContext.Provider value={{preference, setPreference, loaded}}>{children}</ThemeContext.Provider>
}

export const useThemePreference = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemePreference must be used inside a ThemePreferenceProvider')
  return ctx
}