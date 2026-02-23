"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

const aboutImageCards = [
  {
    src: "/images/about/piz-nadjini-about-01.jpg",
    alt: "About section image 1",
    mobileClassName: "left-2 top-18 w-[8.5rem] sm:left-4 sm:top-20 sm:w-[10rem]",
    className:
      "md:-left-10 md:top-8 md:w-[16rem] lg:-left-20 lg:w-[19rem] xl:-left-28",
    aspectClassName: "aspect-[4/5]",
    delay: 0.05,
    mobileFloatY: [36, -520] as const,
    floatY: [120, -820] as const,
  },
  {
    src: "/images/about/piz-nadjini-about-02.jpg.jpg",
    alt: "About section image 2",
    mobileClassName:
      "right-3 top-28 w-[4.75rem] sm:right-5 sm:top-32 sm:w-[5.75rem]",
    className:
      "md:left-6 md:bottom-14 md:w-[6.5rem] lg:left-2 lg:bottom-8 lg:w-[8rem] xl:-left-2",
    aspectClassName: "aspect-square",
    delay: 0.12,
    mobileFloatY: [26, -420] as const,
    floatY: [72, -720] as const,
  },
  {
    src: "/images/about/piz-nadjini-about-03.jpg.jpg",
    alt: "About section image 3",
    mobileClassName:
      "left-4 bottom-28 w-[5.25rem] sm:left-8 sm:bottom-32 sm:w-[6.5rem]",
    className:
      "md:-right-4 md:top-2 md:w-[8rem] lg:-right-10 lg:top-4 lg:w-[10rem] xl:-right-16",
    aspectClassName: "aspect-[3/4]",
    delay: 0.18,
    mobileFloatY: [42, -500] as const,
    floatY: [88, -760] as const,
  },
  {
    src: "/images/about/piz-nadjini-about-04.jpg.jpg",
    alt: "About section image 4",
    mobileClassName:
      "right-2 bottom-16 w-[9.25rem] sm:right-4 sm:bottom-20 sm:w-[11rem]",
    className:
      "md:right-4 md:bottom-6 md:w-[17rem] lg:-right-8 lg:bottom-0 lg:w-[21rem] xl:-right-[4.5rem]",
    aspectClassName: "aspect-[4/5]",
    delay: 0.25,
    mobileFloatY: [60, -640] as const,
    floatY: [150, -980] as const,
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
      className="relative bg-white px-4 py-[4.5rem] md:px-6 md:py-0"
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
                <div className="relative z-10 mx-auto max-w-4xl pt-8 text-center md:pt-0">
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
                        Piz Nadjini is where every thread and every track is designed to sparkle.
                        {" "}Fill the night with color and the soul with sound. Be bold, be
                        {" "}bright, be yourself.
                      </p>

                      <motion.p
                        aria-hidden
                        style={{ clipPath: mobileHeadlineRevealClipPath }}
                        className="absolute inset-0 text-balance text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-900 pb-[0.16em] sm:text-[2.7rem]"
                      >
                        Piz Nadjini is where every thread and every track is designed to sparkle.
                        {" "}Fill the night with color and the soul with sound. Be bold, be
                        {" "}bright, be yourself.
                      </motion.p>
                    </div>

                    <div className="relative hidden md:inline-block md:max-w-full">
                      <p
                        aria-hidden
                        className="text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-300 pb-[0.16em] sm:text-[2.7rem] md:text-[3.3rem] lg:text-[4.15rem] xl:text-[4.65rem]"
                      >
                        Piz Nadjini is where every thread and every track is designed to sparkle.
                        {" "}Fill the night with color and the soul with sound. Be bold, be
                        {" "}bright, be yourself.
                      </p>

                      <motion.p
                        aria-hidden
                        style={{ clipPath: headlineRevealClipPath }}
                        className="absolute inset-0 text-[1.9rem] leading-[0.95] font-semibold tracking-[-0.04em] text-zinc-900 pb-[0.16em] sm:text-[2.7rem] md:text-[3.3rem] lg:text-[4.15rem] xl:text-[4.65rem]"
                      >
                        Piz Nadjini is where every thread and every track is designed to sparkle.
                        {" "}Fill the night with color and the soul with sound. Be bold, be
                        {" "}bright, be yourself.
                      </motion.p>
                    </div>

                    <p className="sr-only">
                      Piz Nadjini is where every thread and every track is
                      designed to sparkle. Fill the night with color and the
                      soul with sound. Be bold, be bright, be yourself.
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

  return (
    <motion.figure
      style={{ y }}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
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
