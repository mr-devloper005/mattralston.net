'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Sparkles, UserRoundPlus } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { safeInternalPath } from '@/lib/safe-internal-path'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { signup, isLoading } = useAuth()
  const from = searchParams.get('from')
  const loginHref = from ? `/login?from=${encodeURIComponent(from)}` : '/login'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [creatorType, setCreatorType] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await signup(name, email, password)
    toast({
      title: 'Account created',
      description: 'Your profile session is saved locally on this browser.',
    })
    router.push(safeInternalPath(from))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <UserRoundPlus className="h-3.5 w-3.5" />
            Join the profile network
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Create your account</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Set up your account to build your profile and use the site with a saved session on this device.</p>
          <div className="mt-8 grid gap-3">
            {['Profile-focused experience', 'Straightforward settings', 'Local account persistence'].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Create account</p>
          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <Input className="h-12 rounded-xl border-slate-300" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input className="h-12 rounded-xl border-slate-300" placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input className="h-12 rounded-xl border-slate-300" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Input
              className="h-12 rounded-xl border-slate-300"
              placeholder="What best describes you? (optional)"
              value={creatorType}
              onChange={(e) => setCreatorType(e.target.value)}
            />
            <Button type="submit" className="h-12 rounded-full bg-[#b91c1c] text-sm font-semibold text-white hover:bg-[#991b1b]" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <span>Already have an account?</span>
            <Link href={loginHref} className="inline-flex items-center gap-2 font-semibold text-red-700 hover:underline">
              <Sparkles className="h-4 w-4" />
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function RegisterFallback() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="h-[420px] animate-pulse rounded-2xl border border-slate-200 bg-white/80 shadow-sm" />
    </main>
  )
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900">
      <NavbarShell />
      <Suspense fallback={<RegisterFallback />}>
        <RegisterForm />
      </Suspense>
      <Footer />
    </div>
  )
}
