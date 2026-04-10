import Link from "next/link";
import { LifeBuoy, MessageCircleQuestion, UserCircle } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const supportTopics = [
  { title: "Profile setup", description: "Create a profile, add a photo and summary, and keep your details up to date." },
  { title: "Account and sign-in", description: "Sign in on this device, sign out, and manage your session from Settings." },
  { title: "Privacy on your profile", description: "Control what appears on your public profile and who can infer your contact details." },
  { title: "Getting help", description: "Contact us if something on your profile does not look right or you need a hand." },
];

const profileFaqs = [
  {
    id: "create",
    question: "How do I create a profile?",
    answer: "Sign in or create an account first. Then use Create profile on the home page, the floating button when signed in, or the profile directory. Fill in your name, summary, and optional links—you can edit later in Settings.",
  },
  {
    id: "photo",
    question: "How do I change my profile photo?",
    answer: "Go to Settings, open Profile, choose Edit profile, then upload a new image. JPG or PNG up to 2MB works best.",
  },
  {
    id: "visibility",
    question: "Who can see my profile?",
    answer: "Your profile is meant to be discoverable in the profile directory. In Settings under Privacy you can limit email visibility and adjust related options.",
  },
  {
    id: "contact",
    question: "Where do I get more help?",
    answer: "Use the Contact page to send a message. Describe your profile or account issue and we will respond with next steps.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#eef2f9_100%)]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-700">
            <LifeBuoy className="h-3.5 w-3.5" />
            Help Center
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Help for your profile</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Quick answers about creating and managing your public profile on this site.
          </p>
          <Link href="/contact" className="mt-4 inline-flex rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]">
            Contact support
          </Link>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {supportTopics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <UserCircle className="h-5 w-5 text-red-700" />
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{topic.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <MessageCircleQuestion className="h-5 w-5 text-red-700" /> FAQ
            </h3>
            <Accordion type="single" collapsible className="mt-4">
              {profileFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
