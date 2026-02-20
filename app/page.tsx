"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f2e8] text-zinc-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.18),transparent_42%),radial-gradient(circle_at_20%_80%,_rgba(217,119,6,0.14),transparent_38%)]"
      />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl space-y-7"
        >
          <p className="inline-flex rounded-full border border-zinc-300/70 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.24em] text-zinc-700">
            Piz Nadjini
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            DJ sets and kimono design that move with rhythm.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            A minimal world where sound, silhouette, and craft meet on one
            stage.
          </p>

          <div className="pt-1">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="mailto:hello@piznadjini.com">Book Piz Nadjini</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
