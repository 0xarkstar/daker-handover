'use client'

import { useCallback } from 'react'
import { Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/context'
import { toast } from 'sonner'

export function DataTools() {
  const { t } = useI18n()

  const handleExport = useCallback(() => {
    const data: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key)
        if (value) data[key] = value
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daker-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(t('common.save'))
  }, [t])

  const handleImport = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid format')
          }
          Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
              localStorage.setItem(key, value)
            }
          })
          toast.success('Import complete')
          window.location.reload()
        } catch {
          toast.error('Invalid backup file')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }, [])

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="brutal-button gap-1.5 font-terminal text-xs" onClick={handleExport}>
        <Download className="h-3.5 w-3.5" />
        Export
      </Button>
      <Button variant="outline" size="sm" className="brutal-button gap-1.5 font-terminal text-xs" onClick={handleImport}>
        <Upload className="h-3.5 w-3.5" />
        Import
      </Button>
    </div>
  )
}
