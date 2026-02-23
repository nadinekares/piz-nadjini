"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Button } from "@/components/ui/button";

const aboutImageCards = [
  {
    src: "/images/about/piz-nadjini-about-01.jpg",
    alt: "About section image 1",
    mobileClassName: "left-2 top-14 w-[9rem] sm:left-4 sm:top-16 sm:w-[10.5rem]",
    className:
      "md:-left-10 md:top-8 md:w-[16rem] lg:-left-20 lg:w-[19rem] xl:-left-28",
    aspectClassName: "aspect-[4/5]",
    delay: 0.05,
    mobileFloatY: [20, -1100] as const,
    floatY: [120, -1100] as const,
  },
  {
    src: "/images/about/piz-nadjini-about-02.jpg.jpg",
    alt: "About section image 2",
    mobileClassName:
      "right-2 top-44 w-[5rem] sm:right-4 sm:top-48 sm:w-[6.25rem]",
    className:
      "md:left-6 md:bottom-14 md:w-[6.5rem] lg:left-2 lg:bottom-8 lg:w-[8rem] xl:-left-2",
    aspectClassName: "aspect-square",
    delay: 0.12,
    mobileFloatY: [12, -980] as const,
    floatY: [72, -980] as const,
  },
  {
    src: "/images/about/piz-nadjini-about-03.jpg.jpg",
    alt: "About section image 3",
    mobileClassName:
      "left-3 top-[112svh] w-[6rem] sm:left-6 sm:top-[108svh] sm:w-[7.25rem]",
    className:
      "md:-right-4 md:top-2 md:w-[8rem] lg:-right-10 lg:top-4 lg:w-[10rem] xl:-right-16",
    aspectClassName: "aspect-[3/4]",
    delay: 0.18,
    mobileFloatY: [10, -1450] as const,
    floatY: [88, -1180] as const,
  },
  {
    src: "/images/about/piz-nadjini-about-04.jpg.jpg",
    alt: "About section image 4",
    mobileClassName:
      "right-2 top-[134svh] w-[10rem] sm:right-5 sm:top-[126svh] sm:w-[12rem]",
    className:
      "md:right-4 md:bottom-6 md:w-[17rem] lg:-right-8 lg:bottom-0 lg:w-[21rem] xl:-right-[4.5rem]",
    aspectClassName: "aspect-[4/5]",
    delay: 0.25,
    mobileFloatY: [6, -1700] as const,
    floatY: [150, -1500] as const,
  },
] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const logoStageRef = useRef<HTMLDivElement>(null);
  const portraitLogoRef = useRef<HTMLDivElement>(null);
  const landscapeLogoRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [cardsRowMarginTop, setCardsRowMarginTop] = useState(-260);
  const [rightCardMarginTop, setRightCardMarginTop] = useState(90);

  const logoYRaw = useTransform(scrollY, [0, 1200], [0, -160]);
  const cardsYRaw = useTransform(scrollY, [0, 1200], [0, -520]);
  const logoY = useSpring(logoYRaw, { stiffness: 110, damping: 22, mass: 0.35 });
  const cardsY = useSpring(cardsYRaw, { stiffness: 110, damping: 22, mass: 0.35 });

  useEffect(() => {
    const updateLayout = () => {
      const stage = logoStageRef.current;
      const portraitLogo = portraitLogoRef.current;
      const landscapeLogo = landscapeLogoRef.current;
      if (!stage || !portraitLogo || !landscapeLogo) return;

      const portraitVisible = getComputedStyle(portraitLogo).display !== "none";
      const activeLogo = portraitVisible ? portraitLogo : landscapeLogo;
      const leftAttach = portraitVisible ? 0.8 : 0.65;
      const rightAttach = portraitVisible ? 0.88 : 0.85;
      const overlapNudge = portraitVisible ? 60 : 0;
      const minOverlapPx = portraitVisible ? 20 : 10;

      const stageRect = stage.getBoundingClientRect();
      const logoRect = activeLogo.getBoundingClientRect();
      const logoTopInStage = logoRect.top - stageRect.top;
      const targetTopInStage = logoTopInStage + leftAttach * logoRect.height;
      const rightDelta = (rightAttach - leftAttach) * logoRect.height;
      let rowMarginTop = targetTopInStage - stageRect.height - overlapNudge;

      const rightTopInStage = stageRect.height + rowMarginTop + rightDelta;
      const maxRightTopToTouch = logoTopInStage + logoRect.height - minOverlapPx;

      if (rightTopInStage > maxRightTopToTouch) {
        rowMarginTop -= rightTopInStage - maxRightTopToTouch;
      }

      setCardsRowMarginTop(rowMarginTop);
      setRightCardMarginTop(rightDelta);
    };

    updateLayout();

    const stage = logoStageRef.current;
    const portraitLogo = portraitLogoRef.current;
    const landscapeLogo = landscapeLogoRef.current;
    if (!stage || !portraitLogo || !landscapeLogo) return;

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(stage);
    resizeObserver.observe(portraitLogo);
    resizeObserver.observe(landscapeLogo);
    window.addEventListener("resize", updateLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  return (
    <main className="w-full bg-[#FFFFFF]">
      <MinimalNavigation />

      <section ref={heroRef} className="w-full" aria-label="Piz Nadjini hero">
        <motion.div
          ref={logoStageRef}
          style={{ y: logoY }}
          className="relative z-10 flex min-h-screen items-center justify-center px-4 md:px-6"
        >
          <div className="w-full">
            <div ref={portraitLogoRef} className="logo-portrait justify-center">
              <Image
                src="/images/logo/piznadjinilogo_black_vertical.svg"
                alt="Piz Nadjini logo"
                width={300}
                height={1311}
                priority
                className="h-[72svh] w-auto max-w-[76vw]"
                sizes="76vw"
              />
            </div>

            <div ref={landscapeLogoRef} className="logo-landscape">
              <Image
                src="/images/logo/piznadjinilogo_black_horizontal.svg"
                alt="Piz Nadjini logo"
                width={1311}
                height={300}
                priority
                className="h-auto w-full"
                sizes="100vw"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: cardsY, marginTop: cardsRowMarginTop }}
          className="relative z-20 px-4 pb-4 md:px-6 md:pb-6"
          aria-hidden
        >
          <div className="grid w-full grid-cols-2 gap-4 md:gap-6">
            <motion.article
              className="relative aspect-[3/4] min-h-[16rem] w-full overflow-hidden rounded-2xl sm:min-h-[18rem] md:aspect-[4/5] md:min-h-[12.5rem]"
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/hero/piz-nadjini-card-01.jpg"
                alt="Piz Nadjini hero image card 1"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_56%,rgba(0,0,0,0.18)_100%)]"
              />
            </motion.article>

            <motion.article
              className="relative aspect-[3/4] min-h-[16rem] w-full overflow-hidden rounded-2xl sm:min-h-[18rem] md:aspect-[4/5] md:min-h-[12.5rem]"
              style={{ marginTop: rightCardMarginTop }}
              initial={{ y: "110vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/hero/piz-nadjini-card-02.jpg"
                alt="Piz Nadjini hero image card 2"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_56%,rgba(0,0,0,0.18)_100%)]"
              />
            </motion.article>
          </div>
        </motion.div>
      </section>

      <AboutSection />
      <MinimalFooter />

      <style jsx>{`
        .logo-landscape {
          display: block;
        }

        .logo-portrait {
          display: none;
        }

        @media (orientation: portrait) {
          .logo-landscape {
            display: none;
          }

          .logo-portrait {
            display: flex;
          }
        }
      `}</style>
    </main>
  );
}

function MinimalNavigation() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const directionThreshold = 4;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current;

    if (latest <= 8) {
      setIsVisible(true);
      lastScrollYRef.current = latest;
      return;
    }

    if (latest > previous + directionThreshold) {
      setIsVisible(false);
    } else if (latest < previous - directionThreshold) {
      setIsVisible(true);
    }

    lastScrollYRef.current = latest;
  });

  return (
    <motion.header
      initial={false}
      animate={isVisible ? "shown" : "hidden"}
      variants={{
        shown: { y: 0 },
        hidden: { y: "-120%" },
      }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-6 md:py-5"
    >
      <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between">
        <Link
          href="/"
          aria-label="Piz Nadjini home"
          className="pointer-events-auto inline-flex items-center"
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
          className="pointer-events-auto rounded-full border border-black bg-white/90 px-4 text-[0.7rem] font-medium tracking-[0.08em] text-black uppercase shadow-none backdrop-blur-sm hover:bg-white"
        >
          <a href="#contact">Contact</a>
        </Button>
      </nav>
    </motion.header>
  );
}

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const headlineRevealClipPath = useTransform(scrollYProgress, (value) => {
    const start = 0.1;
    const end = 0.78;
    const progress = Math.min(Math.max((value - start) / (end - start), 0), 1);
    const hiddenBottom = (1 - progress) * 100;
    return `inset(0 0 ${hiddenBottom}% 0)`;
  });
  const mobileHeadlineRevealClipPath = useTransform(scrollYProgress, (value) => {
    const start = 0.12;
    const end = 0.72;
    const progress = Math.min(Math.max((value - start) / (end - start), 0), 1);
    const hiddenBottom = (1 - progress) * 100;
    return `inset(0 0 ${hiddenBottom}% 0)`;
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white px-4 pt-8 pb-[4.5rem] md:px-6 md:py-0"
      aria-label="About Piz Nadjini"
    >
      <div className="relative mx-auto max-w-[90rem]">
        <div
          ref={trackRef}
          className="relative min-h-[185svh] sm:min-h-[200svh] md:min-h-[230svh] lg:min-h-[250svh]"
        >
          <div className="sticky top-0 h-[100svh] overflow-hidden md:h-screen">
            <div className="relative grid h-[100svh] place-items-center md:h-screen">
              <div className="relative mx-auto grid w-full max-w-5xl place-items-center md:min-h-[42rem] lg:min-h-[46rem]">
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative inline-block max-w-full align-top text-center">
                    <div className="relative md:hidden">
                      <p
                        aria-hidden
                        className="text-balance text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-300 pb-[0.16em] sm:text-[2.7rem]"
                      >
                        Piz Nadjini is where everything is designed to sparkle.
                        {" "}To fill the night with color and the soul with sound. To be bold,
                        {" "}to be bright, to be yourself.
                      </p>

                      <motion.p
                        aria-hidden
                        style={{ clipPath: mobileHeadlineRevealClipPath }}
                        className="absolute inset-0 text-balance text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-900 pb-[0.16em] sm:text-[2.7rem]"
                      >
                        Piz Nadjini is where everything is designed to sparkle.
                        {" "}To fill the night with color and the soul with sound. To be bold,
                        {" "}to be bright, to be yourself.
                      </motion.p>
                    </div>

                    <div className="relative hidden md:inline-block md:max-w-full">
                      <p
                        aria-hidden
                        className="text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-300 pb-[0.16em] sm:text-[2.7rem] md:text-[3.3rem] lg:text-[4.15rem] xl:text-[4.65rem]"
                      >
                        Piz Nadjini is where everything is designed to sparkle.
                        {" "}To fill the night with color and the soul with sound. To be bold,
                        {" "}to be bright, to be yourself.
                      </p>

                      <motion.p
                        aria-hidden
                        style={{ clipPath: headlineRevealClipPath }}
                        className="absolute inset-0 text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-900 pb-[0.16em] sm:text-[2.7rem] md:text-[3.3rem] lg:text-[4.15rem] xl:text-[4.65rem]"
                      >
                        Piz Nadjini is where everything is designed to sparkle.
                        {" "}To fill the night with color and the soul with sound. To be bold,
                        {" "}to be bright, to be yourself.
                      </motion.p>
                    </div>

                    <p className="sr-only">
                      Piz Nadjini is where everything is designed to sparkle. To
                      fill the night with color and the soul with sound. To be
                      bold, to be bright, to be yourself.
                    </p>
                  </div>
                </motion.div>
                </div>

                <div className="pointer-events-none absolute inset-0 md:hidden" aria-hidden>
                  {aboutImageCards.map((card) => (
                    <AboutFloatingImageCard
                      key={`${card.src}-mobile`}
                      card={card}
                      scrollYProgress={scrollYProgress}
                      positionClassName={card.mobileClassName}
                      floatRange={card.mobileFloatY}
                      sizes="(min-width: 640px) 176px, 148px"
                      overlayClassName="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    />
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
                  {aboutImageCards.map((card) => (
                    <AboutFloatingImageCard
                      key={card.src}
                      card={card}
                      scrollYProgress={scrollYProgress}
                      positionClassName={card.className}
                      floatRange={card.floatY}
                      sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, 220px"
                      overlayClassName="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MinimalFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-14 md:px-6 md:py-20">
        <div className="flex w-full items-start justify-between gap-6 md:items-stretch md:gap-10">
          <p className="text-2xl leading-[0.95] font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
            <span className="block">be bold.</span>
            <span className="block">be bright.</span>
            <span className="block">be you.</span>
          </p>

          <div className="flex shrink-0 flex-col items-end gap-3 self-stretch justify-between">
            <div className="flex flex-col items-end gap-3">
              <Link
                href="/about"
                className="text-[0.7rem] leading-none font-medium tracking-[0.08em] uppercase text-white/90 transition-colors hover:text-white"
              >
                About
              </Link>
              <Link
                href="/music"
                className="text-[0.7rem] leading-none font-medium tracking-[0.08em] uppercase text-white/90 transition-colors hover:text-white"
              >
                Music
              </Link>
              <Link
                href="/fashion"
                className="text-[0.7rem] leading-none font-medium tracking-[0.08em] uppercase text-white/90 transition-colors hover:text-white"
              >
                Fashion
              </Link>
            </div>

            <Button
              asChild
              size="sm"
              data-cursor-merge-theme="dark"
              className="rounded-full border border-white bg-transparent px-4 text-[0.7rem] font-medium tracking-[0.08em] text-white uppercase shadow-none hover:bg-white hover:text-black"
            >
              <a href="#contact">Contact</a>
            </Button>
          </div>
        </div>
      </div>

      <FooterMarquee />
    </footer>
  );
}

const footerMarqueeImages = [
  "/images/hero/piz-nadjini-card-01.jpg",
  "/images/about/piz-nadjini-about-01.jpg",
  "/images/hero/piz-nadjini-card-02.jpg",
  "/images/about/piz-nadjini-about-02.jpg.jpg",
  "/images/about/piz-nadjini-about-03.jpg.jpg",
  "/images/about/piz-nadjini-about-04.jpg.jpg",
] as const;

function FooterMarquee() {
  return (
    <div className="relative border-t border-white/15 py-5 md:py-7">
      <motion.div
        aria-hidden
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 120, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      >
        <FooterMarqueeSequence />
        <FooterMarqueeSequence />
      </motion.div>
    </div>
  );
}

function FooterMarqueeSequence() {
  return (
    <div className="flex shrink-0 items-center gap-2 pr-2 md:gap-3 md:pr-3">
      {footerMarqueeImages.map((src) => (
        <Fragment key={src}>
          <FooterMarqueeLogo />
          <FooterMarqueeImage src={src} />
        </Fragment>
      ))}
    </div>
  );
}

function FooterMarqueeLogo() {
  return (
    <div className="relative h-16 w-[22rem] shrink-0 sm:h-20 sm:w-[28rem] md:h-24 md:w-[33rem]">
      <Image
        src="/images/logo/piznadjinilogo_black_horizontal.svg"
        alt=""
        fill
        className="object-contain brightness-0 invert"
        sizes="(min-width: 768px) 528px, (min-width: 640px) 448px, 352px"
      />
    </div>
  );
}

function FooterMarqueeImage({ src }: { src: string }) {
  return (
    <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-white/20 sm:h-20 sm:w-32 md:h-24 md:w-36">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 768px) 144px, (min-width: 640px) 128px, 96px"
      />
    </div>
  );
}

type AboutImageCard = (typeof aboutImageCards)[number];

function AboutFloatingImageCard({
  card,
  scrollYProgress,
  positionClassName,
  floatRange,
  sizes,
  overlayClassName,
}: {
  card: AboutImageCard;
  scrollYProgress: MotionValue<number>;
  positionClassName: string;
  floatRange: readonly [number, number];
  sizes: string;
  overlayClassName: string;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [floatRange[0], floatRange[1]]);
  const opacity = useTransform(scrollYProgress, [0, 0.84, 0.96, 1], [1, 1, 0, 0]);

  return (
    <motion.figure
      style={{ y, opacity }}
      initial={{ scale: 0.96 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: card.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute overflow-hidden rounded-2xl will-change-transform ${positionClassName}`}
      aria-hidden
    >
      <div className={`relative ${card.aspectClassName}`}>
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
        <div className={overlayClassName} />
      </div>
    </motion.figure>
  );
}
