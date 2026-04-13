'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

export function PageShell({
  title,
  description,
  actions,
  children,
  surface = 'default',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  surface?: 'default' | 'brand'
}) {
  const brand = surface === 'brand'

  return (
    <div className={cn('min-h-screen', brand ? 'bg-[#fafaf8]' : 'bg-background')}>
      <NavbarShell />
      <main>
        <section
          className={cn(
            'border-b',
            brand
              ? 'border-[#B08D57]/20 bg-[linear-gradient(180deg,#ffffff_0%,#f5f4f0_100%)]'
              : 'border-border bg-secondary/30',
          )}
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
                {brand ? (
                  <div className="flex shrink-0 justify-center sm:justify-start">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-[#B08D57]/25 bg-white p-2 shadow-[0_12px_40px_rgba(26,36,47,0.08)] sm:h-[5.25rem] sm:w-[5.25rem]">
                      <img
                        src="/favicon.png?v=20260413"
                        alt=""
                        width={76}
                        height={76}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ) : null}
                <div>
                  {brand ? (
                    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-[#B08D57] sm:text-left">
                      Matt R Alston
                    </p>
                  ) : null}
                  <h1
                    className={cn(
                      'font-bold',
                      brand
                        ? 'mt-2 text-center text-4xl tracking-[-0.03em] text-[#1A242F] sm:text-left sm:text-5xl'
                        : 'text-3xl text-foreground',
                    )}
                  >
                    {title}
                  </h1>
                  {description && (
                    <p
                      className={cn(
                        'mt-3 max-w-2xl text-pretty',
                        brand
                          ? 'text-center text-base leading-relaxed text-slate-600 sm:text-left'
                          : 'text-muted-foreground',
                      )}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </div>
              {actions ? (
                <div className="flex flex-wrap justify-center gap-3 sm:justify-end">{actions}</div>
              ) : null}
            </div>
          </div>
        </section>
        <section
          className={cn(
            'mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8',
            brand ? 'bg-[#fafaf8]' : '',
          )}
        >
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
