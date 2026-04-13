'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  /** Backend/content `type` filter for `/search` (task contentType). Omit for global search. */
  taskType?: string
  placeholder?: string
}

export function NavbarSearchForm({ className, taskType, placeholder = 'Search…' }: Props) {
  return (
    <form action="/search" method="get" className={cn('flex min-w-0 items-center gap-2', className)}>
      <input type="hidden" name="master" value="1" />
      {taskType ? <input type="hidden" name="task" value={taskType} /> : null}
      <Search className="h-4 w-4 shrink-0 text-inherit opacity-60" aria-hidden />
      <input
        type="search"
        name="q"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-inherit outline-none placeholder:opacity-60"
        autoComplete="off"
        aria-label="Search"
      />
      <button
        type="submit"
        className="shrink-0 text-xs font-semibold uppercase tracking-wide text-inherit opacity-80 hover:opacity-100"
      >
        Go
      </button>
    </form>
  )
}
