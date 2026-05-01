'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'

export function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="default"
      className="h-11 gap-2 rounded-full px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </Button>
  )
}
