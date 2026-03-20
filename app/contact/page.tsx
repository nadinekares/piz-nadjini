"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white">
      <header className="px-4 py-4 md:px-6 md:py-5">
        <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between">
          <Link
            href="/"
            aria-label="Piz Nadjini home"
            className="inline-flex items-center"
          >
            <Image
              src="/images/logo/piznadjinisignet_black.svg"
              alt="Piz Nadjini"
              width={48}
              height={48}
              priority
              className="size-8 sm:size-9"
              sizes="(min-width: 640px) 36px, 32px"
            />
          </Link>

          <Button
            asChild
            size="sm"
            className="rounded-full border border-black bg-white/90 px-4 text-[0.7rem] font-medium tracking-[0.08em] text-black uppercase shadow-none backdrop-blur-sm hover:bg-white"
          >
            <Link href="/">Home</Link>
          </Button>
        </nav>
      </header>

      <section
        className="flex flex-1 items-center px-4 py-14 md:px-6 md:py-20"
        aria-label="Contact form"
      >
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="max-w-lg">
            <p className="text-[0.7rem] font-medium tracking-[0.1em] text-zinc-700 uppercase">
              Contact
            </p>
            <h1 className="mt-3 text-balance text-4xl leading-[0.95] font-semibold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
              Let&apos;s create your next moment.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-700 sm:text-base">
              Share your event details or collaboration idea and I&apos;ll get
              back to you.
            </p>
          </div>

          <form
            className="w-full rounded-2xl border border-zinc-900/10 bg-white p-5 shadow-[0_24px_60px_-35px_rgba(0,0,0,0.3)] sm:p-7 md:p-8"
          >
            <div className="flex flex-col gap-4">
              <label htmlFor="contact-name" className="space-y-2">
                <span className="block text-[0.68rem] font-semibold tracking-[0.1em] text-zinc-600 uppercase">
                  Name
                </span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="Your name"
                />
              </label>

              <label htmlFor="contact-email" className="space-y-2">
                <span className="block text-[0.68rem] font-semibold tracking-[0.1em] text-zinc-600 uppercase">
                  Email
                </span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="you@example.com"
                />
              </label>

              <label htmlFor="contact-message" className="space-y-2">
                <span className="block text-[0.68rem] font-semibold tracking-[0.1em] text-zinc-600 uppercase">
                  Message
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  placeholder="Tell me about your project, event, or timeline."
                />
              </label>
            </div>

            <Button
              type="submit"
              className="mt-5 w-full rounded-full border border-black bg-black py-6 text-[0.74rem] font-medium tracking-[0.08em] text-white uppercase shadow-none hover:bg-white hover:text-black sm:mt-6 sm:w-auto sm:px-8 sm:py-5"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
