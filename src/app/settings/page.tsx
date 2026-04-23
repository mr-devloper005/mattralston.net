"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout, updateUser } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const coverInputRef = useRef<HTMLInputElement | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [location, setLocation] = useState(user?.location || "")
  const [website, setWebsite] = useState(user?.website || "")

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({ title: "Profile saved", description: "Your profile was updated." })
    }, 600)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setBio(user.bio)
    setLocation(user.location || "")
    setWebsite(user.website || "")
  }, [user])

  const notifyProfileUpdate = () => {
    window.dispatchEvent(new CustomEvent("nexus-profile-updated"))
  }

  const handleProfileSave = () => {
    if (!user) return
    updateUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      bio: bio.trim() || user.bio,
      location: location.trim() || undefined,
      website: website.trim() || undefined,
    })
    notifyProfileUpdate()
    handleSave()
    setIsEditingProfile(false)
  }

  const handleAvatarUpload = (file: File | null) => {
    if (!file || !user) return
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image." })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2MB." })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      updateUser({ avatar: result })
      toast({ title: "Avatar updated", description: "Your profile photo was updated." })
    }
    reader.readAsDataURL(file)
  }

  const handleCoverUpload = (file: File | null) => {
    if (!file || !user) return
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image." })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2MB." })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      updateUser({ coverImage: result })
      notifyProfileUpdate()
      toast({ title: "Cover updated", description: "Your cover image was updated." })
    }
    reader.readAsDataURL(file)
  }

  const handleProfileCancel = () => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setBio(user.bio)
    setLocation(user.location || "")
    setWebsite(user.website || "")
    setIsEditingProfile(false)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900">
      <NavbarShell />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-900">Profile</h1>
          <p className="mt-2 text-sm leading-7 text-slate-600">Name, photo, and details shown on your profile.</p>
        </section>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border border-slate-200">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#b91c1c] text-white shadow hover:bg-[#991b1b]"
                  onClick={() => {
                    if (!isEditingProfile) {
                      toast({ title: "Edit profile first", description: "Click Edit profile to upload a photo." })
                      return
                    }
                    avatarInputRef.current?.click()
                  }}
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <Input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleAvatarUpload(e.target.files?.[0] ?? null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-200"
                  onClick={() => {
                    if (!isEditingProfile) {
                      toast({ title: "Edit profile first", description: "Click Edit profile to upload." })
                      return
                    }
                    avatarInputRef.current?.click()
                  }}
                >
                  Upload photo
                </Button>
                <p className="mt-2 text-xs text-slate-500">JPG or PNG, up to 2MB.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div
                  className="h-28 w-full bg-cover bg-center bg-slate-100"
                  style={{ backgroundImage: `url(${user?.coverImage || "/placeholder.svg?height=320&width=1280"})` }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleCoverUpload(e.target.files?.[0] ?? null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-200"
                  onClick={() => {
                    if (!isEditingProfile) {
                      toast({ title: "Edit profile first", description: "Click Edit profile to upload a cover." })
                      return
                    }
                    coverInputRef.current?.click()
                  }}
                >
                  Upload cover
                </Button>
                <span className="text-xs text-slate-500">About 1280×320 looks best.</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditingProfile} className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditingProfile} className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} disabled={!isEditingProfile} rows={4} className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} disabled={!isEditingProfile} className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={!isEditingProfile} className="rounded-xl border-slate-200" />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-6">
              {isEditingProfile ? (
                <>
                  <Button type="button" variant="outline" className="rounded-full" onClick={handleProfileCancel}>
                    Cancel
                  </Button>
                  <Button type="button" className="rounded-full bg-[#b91c1c] hover:bg-[#991b1b]" onClick={handleProfileSave} disabled={isSaving}>
                    {isSaving ? "Saving…" : "Save"}
                  </Button>
                </>
              ) : (
                <Button type="button" className="rounded-full bg-[#b91c1c] hover:bg-[#991b1b]" onClick={() => setIsEditingProfile(true)}>
                  Edit profile
                </Button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 text-sm">
              <Link href="/contact" className="font-medium text-red-700 hover:underline">
                Need help?
              </Link>
              <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 font-medium text-red-700 hover:underline">
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
