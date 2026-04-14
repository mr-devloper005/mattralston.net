'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useAuth } from '@/lib/auth-context'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/**
 * Create flows (e.g. profile, articles): signed-in users go to `href`; others go to sign-in with return path (register is linked from login).
 */
export function GatedCreateLink({ href, ...props }: Props) {
  const { isAuthenticated } = useAuth()
  const dest = isAuthenticated ? href : `/login?from=${encodeURIComponent(href)}`
  return <Link href={dest} {...props} />
}
