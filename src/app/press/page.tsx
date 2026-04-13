'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { Mail, Newspaper } from 'lucide-react'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      surface="brand"
      title="Press & media"
      description="Brand assets, product context, and recent coverage—organized so you can move quickly without chasing approvals in a dozen threads."
      actions={
        <Button variant="outline" className="border-[#B08D57]/40 bg-white text-[#1A242F] hover:bg-[#faf8f5]" asChild>
          <a href="mailto:press@example.com" className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4" />
            press@example.com
          </a>
        </Button>
      }
    >
      <div className="space-y-16">
        <section className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <Card className="border-[#B08D57]/15 bg-white shadow-[0_20px_60px_rgba(26,36,47,0.05)]">
            <CardContent className="space-y-6 p-8">
              <div className="flex items-center gap-2 text-[#B08D57]">
                <Newspaper className="h-5 w-5" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.26em]">Press kit</span>
              </div>
              <h2 className="text-2xl font-semibold text-[#1A242F] sm:text-3xl">Downloads & previews</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Use these materials for articles, conference decks, and partner announcements. If you need a bespoke angle—quotes, data points, or a walkthrough—we are responsive on the press alias above.
              </p>
              <div className="space-y-3">
                {mockPressAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-2xl border border-[#e8e2d9] bg-[#fafaf8] px-5 py-4 transition-colors hover:border-[#B08D57]/35"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium text-[#1A242F]">{asset.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{asset.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="border-0 bg-[#1A242F]/90 text-white">{asset.fileType}</Badge>
                        <Button size="sm" variant="outline" className="border-[#B08D57]/35" onClick={() => setActiveAssetId(asset.id)}>
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#B08D57] text-white hover:bg-[#9a7a49]"
                          onClick={() =>
                            toast({
                              title: 'Download started',
                              description: `${asset.title} is downloading.`,
                            })
                          }
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#1A242F]/10 bg-[#1A242F] text-white">
            <CardContent className="space-y-4 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#B08D57]">Boilerplate</p>
              <p className="text-sm leading-relaxed text-slate-200">
                We build calm, trustworthy surfaces for publishing, discovery, and community bookmarking—so teams can share work that still reads well months later.
              </p>
              <p className="text-xs text-slate-400">Update this short description in your CMS or identity file when the narrative evolves.</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">Coverage</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1A242F] sm:text-3xl">Selected mentions</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {mockPressCoverage.map((item) => (
              <Card
                key={item.id}
                className="border-[#e8e2d9] bg-white transition-transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B08D57]">{item.outlet}</p>
                  <p className="mt-3 text-base font-medium leading-snug text-[#1A242F]">{item.headline}</p>
                  <p className="mt-4 text-xs text-slate-400">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#e8e2d9]">
          <DialogHeader>
            <DialogTitle className="text-[#1A242F]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-[#e8e2d9] bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-slate-600">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="border-[#B08D57]/35" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="bg-[#1A242F] text-white"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
