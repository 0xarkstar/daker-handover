'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale } from '@/types'
import { dictionaries } from './dictionaries'

interface I18nContextValue {
  readonly locale: Locale
  readonly setLocale: (locale: Locale) => void
  readonly t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'ko',
  setLocale: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'ko'
    return (localStorage.getItem('locale') as Locale) || 'ko'
  })

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const t = useCallback(
    (key: string) => dictionaries[locale][key] ?? key,
    [locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
