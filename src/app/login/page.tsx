'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Users, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { safeInternalPath } from '@/lib/safe-internal-path'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const from = searchParams.get('from')
  const registerHref = from ? `/register?from=${encodeURIComponent(from)}` : '/register'

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await login(email, password)
    toast({
      title: 'Signed in successfully',
      description: 'Your session is now saved locally on this browser.',
    })
    router.push(safeInternalPath(from))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <Users className="h-3.5 w-3.5" />
            Profile network access
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Welcome back</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Sign in to manage your profile, continue where you left off, and use create and publishing tools.
          </p>
          <div className="mt-8 grid gap-3">
            {['Profile and settings in one place', 'Simple layout focused on people', 'Session saved in this browser'].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Sign in</p>
          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <Input
              className="h-12 rounded-xl border-slate-300"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <Input
              className="h-12 rounded-xl border-slate-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
            <Button type="submit" className="h-12 rounded-full bg-[#b91c1c] text-sm font-semibold text-white hover:bg-[#991b1b]" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <Link href="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
            <Link href={registerHref} className="inline-flex items-center gap-2 font-semibold text-red-700 hover:underline">
              <Sparkles className="h-4 w-4" />
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function LoginFallback() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="h-[420px] animate-pulse rounded-2xl border border-slate-200 bg-white/80 shadow-sm" />
    </main>
  )
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900">
      <NavbarShell />
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
      <Footer />
    </div>
  )
}
