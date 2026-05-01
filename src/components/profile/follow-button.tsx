'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UserPlus, UserCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleFollow = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    setIsFollowing(!isFollowing)
  }

  return (
    <Button
      onClick={handleFollow}
      variant={isFollowing ? 'outline' : 'default'}
      size="default"
      className={`h-11 gap-2 rounded-full px-5 text-sm font-semibold ${
        isFollowing
          ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
          : 'bg-red-700 text-white hover:bg-red-800'
      }`}
    >
      {isFollowing ? (
        <>
          <UserCheck className="h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  )
}
