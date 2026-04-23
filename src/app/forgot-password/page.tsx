"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)] text-slate-900">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900">Reset your password</h1>
              <p className="mb-8 text-sm leading-7 text-slate-600">Enter your email and we will send you a link to reset your password.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-xl border-slate-200 pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="h-11 w-full rounded-full bg-[#b91c1c] hover:bg-[#991b1b]" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-2xl font-semibold text-slate-900">Check your email</h1>
              <p className="mb-8 text-sm leading-7 text-slate-600">
                We sent a reset link to <strong className="text-slate-900">{email}</strong>
              </p>
              <Button asChild variant="outline" className="w-full rounded-full border-slate-200">
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-slate-600">
                Didn&apos;t receive the email?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-medium text-red-700 hover:underline">
                  Try again
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
