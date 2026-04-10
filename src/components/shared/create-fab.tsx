'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const HIDDEN_PREFIXES = ['/login', '/register', '/forgot-password']

export function CreateFab() {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  if (!isAuthenticated) return null
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null

  return (
    <Link
      href="/create/profile"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full',
        'bg-[#b91c1c] text-white shadow-lg transition-colors hover:bg-[#991b1b]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2',
      )}
      aria-label="Create profile"
    >
      <Plus className="h-7 w-7" strokeWidth={2.25} />
    </Link>
  )
}
