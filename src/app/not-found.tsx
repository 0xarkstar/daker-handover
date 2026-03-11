import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-lg terminal rounded-lg p-6 space-y-3">
        <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] pb-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-muted-foreground">terminal</span>
        </div>
        <div className="space-y-2">
          <p className="font-terminal text-sm">
            <span className="text-muted-foreground">$ </span>
            <span className="text-[var(--terminal-text)]">cat page.tsx</span>
          </p>
          <p className="font-terminal text-sm text-red-400 pl-4">
            Error: File not found (404)
          </p>
          <p className="font-terminal text-xs text-muted-foreground pl-4">
            페이지를 찾을 수 없습니다.
          </p>
        </div>
      </div>
      <Link
        href="/"
        className="brutal-button rounded-md bg-primary px-6 py-2.5 font-terminal text-sm text-primary-foreground"
      >
        $ cd /home
      </Link>
    </div>
  )
}
