'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/i18n/context'

interface ScrollspyNavProps {
  readonly sections: readonly string[]
}

export function ScrollspyNav({ sections }: ScrollspyNavProps) {
  const { t } = useI18n()
  const [activeSection, setActiveSection] = useState(sections[0])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          const id = visible[0].target.id.replace('section-', '')
          setActiveSection(id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )

    const elements = sections
      .map((id) => document.getElementById(`section-${id}`))
      .filter(Boolean) as HTMLElement[]

    for (const el of elements) {
      observerRef.current.observe(el)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [sections])

  function handleClick(sectionId: string) {
    const el = document.getElementById(`section-${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-0 z-10 -mx-4 px-4 py-2 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {sections.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            className={`shrink-0 rounded-full px-3 py-1.5 font-terminal text-xs transition-colors ${
              activeSection === id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {t(`nav.scrollspy.${id}`)}
          </button>
        ))}
      </div>
    </nav>
  )
}
