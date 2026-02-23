"use client";

import Link from "next/link";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroVariantId = "silk" | "pulse" | "editorial";

type HeroVariant = {
  id: HeroVariantId;
  name: string;
  previewLabel: string;
};

const heroVariants: HeroVariant[] = [
  {
    id: "silk",
    name: "Silk Minimal",
    previewLabel: "Soft gradient + calm layout",
  },
  {
    id: "pulse",
    name: "Pulse Stage",
    previewLabel: "Energetic split with metrics",
  },
  {
    id: "editorial",
    name: "Editorial Grid",
    previewLabel: "Bold typography + cards",
  },
];

export function HeroPreviewLayer() {
  const [activeVariant, setActiveVariant] = useState<HeroVariantId>("silk");
  const [compactPanel, setCompactPanel] = useState(true);
  const [panelMinimized, setPanelMinimized] = useState(false);
  const dragControls = useDragControls();

  const currentVariant = useMemo(
    () => heroVariants.find((variant) => variant.id === activeVariant)!,
    [activeVariant],
  );

  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 pb-6 pt-24 text-zinc-900 sm:px-6 sm:pb-8 sm:pt-24 md:px-10">
      <motion.aside
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.08}
        initial={{ x: 0, y: 0 }}
        className={cn(
          "fixed left-4 top-4 z-50 touch-none",
          compactPanel ? "w-[min(84vw,230px)]" : "w-[min(88vw,300px)]",
        )}
      >
        <div className="rounded-2xl border border-zinc-900/10 bg-white/88 p-2 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onPointerDown={(event) => dragControls.start(event)}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-900/10 bg-white/90 px-2 py-1.5 text-left"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Drag
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-400" />
              <span className="truncate text-xs font-medium text-zinc-700">
                {currentVariant.name}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCompactPanel((prev) => !prev)}
              className="rounded-lg border border-zinc-900/10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600 transition hover:border-zinc-900/30"
              aria-label={compactPanel ? "Expand panel" : "Shrink panel"}
            >
              {compactPanel ? "L" : "S"}
            </button>

            <button
              type="button"
              onClick={() => setPanelMinimized((prev) => !prev)}
              className="rounded-lg border border-zinc-900/10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600 transition hover:border-zinc-900/30"
              aria-label={panelMinimized ? "Show variants" : "Hide variants"}
            >
              {panelMinimized ? "+" : "-"}
            </button>
          </div>

          {!panelMinimized ? (
            <div className="mt-2 grid gap-1.5">
              {heroVariants.map((variant) => {
                const isActive = activeVariant === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveVariant(variant.id)}
                    className={cn(
                      "rounded-lg border px-2.5 py-2 text-left transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30",
                      isActive
                        ? "border-zinc-900/70 bg-zinc-900 text-white shadow-sm"
                        : "border-zinc-900/10 bg-white/85 hover:border-zinc-900/35",
                    )}
                  >
                    <p className="text-xs font-semibold">{variant.name}</p>
                    <p
                      className={cn(
                        "mt-0.5 text-[11px]",
                        isActive ? "text-zinc-200" : "text-zinc-600",
                      )}
                    >
                      {variant.previewLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </motion.aside>

      <AnimatePresence mode="wait">
        <motion.section
          key={currentVariant.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto min-h-[calc(100vh-9rem)] w-full max-w-6xl"
          aria-label={`${currentVariant.name} hero preview`}
        >
          {activeVariant === "silk" ? <HeroSilk /> : null}
          {activeVariant === "pulse" ? <HeroPulse /> : null}
          {activeVariant === "editorial" ? <HeroEditorial /> : null}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}

function HeroSilk() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-900/10 bg-[#f8f3ea] px-7 py-14 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(251,191,36,0.28),transparent_36%),radial-gradient(circle_at_10%_90%,rgba(180,83,9,0.18),transparent_38%)]"
      />

      <div className="relative max-w-2xl space-y-7">
        <p className="inline-flex rounded-full border border-zinc-400/40 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-zinc-700">
          Piz Nadjini
        </p>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          DJ sets and kimono design that move with rhythm.
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
          A minimal world where sound, silhouette, and craft meet on one
          stage.
        </p>

        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="mailto:hello@piznadjini.com">Book Piz Nadjini</Link>
        </Button>
      </div>
    </div>
  );
}

function HeroPulse() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-900/15 bg-[#fff6ea] px-7 py-14 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(251,146,60,0.17),transparent_40%),linear-gradient(285deg,rgba(56,189,248,0.14),transparent_45%)]"
      />

      <div className="relative grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end">
        <div className="space-y-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Variant 2 / Pulse Stage
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Sound on the decks.
            <br />
            Form in the fabric.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Performance-led DJ sessions paired with handcrafted kimono
            direction for events, editorials, and culture-first collaborations.
          </p>

          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="mailto:hello@piznadjini.com">Check Availability</Link>
          </Button>
        </div>

        <div className="grid gap-3 text-sm">
          <MetricCard label="Set Duration" value="60-180 min" />
          <MetricCard label="Custom Looks" value="Made to Brief" />
          <MetricCard label="Booking Regions" value="Global" />
        </div>
      </div>
    </div>
  );
}

function HeroEditorial() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-900/15 bg-[#faf7f2] px-7 py-14 sm:px-10 sm:py-20">
      <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
            Variant 3 / Editorial Grid
          </p>

          <h1 className="text-5xl font-semibold leading-[0.94] tracking-tight sm:text-6xl md:text-7xl">
            PIZ
            <br />
            NADJINI
          </h1>

          <p className="max-w-md text-base leading-relaxed text-zinc-700 sm:text-lg">
            DJ and kimono designer shaping immersive sets and wearable stories.
          </p>

          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="mailto:hello@piznadjini.com">Start a Project</Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
          <InfoTile title="Sonic Direction">
            Curated sound environments with high-impact transitions.
          </InfoTile>
          <InfoTile title="Kimono Concepts">
            Modern silhouettes rooted in Japanese craft references.
          </InfoTile>
          <InfoTile title="Ideal For">
            Launch events, art spaces, fashion showcases, and private programs.
          </InfoTile>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-900/10 bg-white/70 p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function InfoTile({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-900/10 bg-white/80 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{children}</p>
    </div>
  );
}
