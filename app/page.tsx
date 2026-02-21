"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

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
      const rightAttach = portraitVisible ? 0.9 : 0.85;

      const stageRect = stage.getBoundingClientRect();
      const logoRect = activeLogo.getBoundingClientRect();
      const logoTopInStage = logoRect.top - stageRect.top;
      const targetTopInStage = logoTopInStage + leftAttach * logoRect.height;

      setCardsRowMarginTop(targetTopInStage - stageRect.height);
      setRightCardMarginTop((rightAttach - leftAttach) * logoRect.height);
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
            <article className="relative aspect-[3/4] min-h-[16rem] w-full overflow-hidden rounded-2xl sm:min-h-[18rem] md:aspect-[4/5] md:min-h-[12.5rem]">
              <motion.div
                className="absolute inset-0"
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
              </motion.div>
            </article>

            <motion.article
              className="relative aspect-[3/4] min-h-[16rem] w-full overflow-hidden rounded-2xl sm:min-h-[18rem] md:aspect-[4/5] md:min-h-[12.5rem]"
              style={{ marginTop: rightCardMarginTop }}
            >
              <motion.div
                className="absolute inset-0"
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
              </motion.div>
            </motion.article>
          </div>
        </motion.div>
      </section>

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
