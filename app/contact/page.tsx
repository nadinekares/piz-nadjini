"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    }
  }

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

          {status === "success" ? (
            <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-zinc-900/10 bg-white p-10 text-center shadow-[0_24px_60px_-35px_rgba(0,0,0,0.3)]">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-zinc-900">
                <svg
                  className="size-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Message sent
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                Thank you! I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-[0.72rem] font-medium tracking-[0.08em] text-zinc-500 uppercase underline underline-offset-4 transition-colors hover:text-zinc-900"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-2xl border border-zinc-900/10 bg-white p-5 shadow-[0_24px_60px_-35px_rgba(0,0,0,0.3)] sm:p-7 md:p-8"
            >
              <div className="flex flex-col gap-4">
                {/* Honeypot field - hidden from real users */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">
                    Website
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

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

              {status === "error" && (
                <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 w-full rounded-full border border-black bg-black py-6 text-[0.74rem] font-medium tracking-[0.08em] text-white uppercase shadow-none hover:bg-white hover:text-black disabled:opacity-50 sm:mt-6 sm:w-auto sm:px-8 sm:py-5"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
