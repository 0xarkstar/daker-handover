import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns'
import { ko, enUS, zhCN, ja } from 'date-fns/locale'
import type { Locale } from '@/types'

const localeMap = {
  ko,
  en: enUS,
  zh: zhCN,
  ja,
} as const

export function formatDate(dateStr: string, locale: Locale = 'ko'): string {
  return format(parseISO(dateStr), 'yyyy.MM.dd HH:mm', {
    locale: localeMap[locale],
  })
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'MM.dd')
}

export function formatRelativeTime(dateStr: string, locale: Locale = 'ko'): string {
  return formatDistanceToNow(parseISO(dateStr), {
    addSuffix: true,
    locale: localeMap[locale],
  })
}

export function getDDay(dateStr: string): string {
  const target = parseISO(dateStr)
  const now = new Date()
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diff > 0) return `D-${diff}`
  if (diff === 0) return 'D-Day'
  return `D+${Math.abs(diff)}`
}

export function getMilestoneStatus(
  dateStr: string
): 'past' | 'current' | 'future' {
  const date = parseISO(dateStr)
  const now = new Date()
  const threshold = 24 * 60 * 60 * 1000 // 1 day
  if (isBefore(date, now)) return 'past'
  if (isAfter(date, new Date(now.getTime() + threshold))) return 'future'
  return 'current'
}

export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getStatusColor(
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'ongoing':
      return 'default'
    case 'upcoming':
      return 'secondary'
    case 'ended':
      return 'outline'
    default:
      return 'default'
  }
}

export function getStatusClassName(status: string): string {
  switch (status) {
    case 'ongoing':
      return 'bg-green-500/10 text-green-700 border-green-200 dark:text-green-400 dark:border-green-800'
    case 'upcoming':
      return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800'
    case 'ended':
      return 'bg-gray-500/10 text-gray-600 border-gray-200 dark:text-gray-400 dark:border-gray-700'
    default:
      return ''
  }
}

export function getStatusLabel(
  status: string,
  locale: Locale = 'ko'
): string {
  const labels: Record<string, Record<Locale, string>> = {
    ongoing: { ko: '진행중', en: 'Ongoing', zh: '进行中', ja: '進行中' },
    upcoming: { ko: '예정', en: 'Upcoming', zh: '即将开始', ja: '予定' },
    ended: { ko: '종료', en: 'Ended', zh: '已结束', ja: '終了' },
  }
  return labels[status]?.[locale] ?? status
}
