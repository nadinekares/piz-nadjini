"use client";

import { useEffect, useRef, useState } from "react";

const EASE = 0.11;

export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);
  const activeRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const tick = () => {
      const el = ref.current;
      if (el) {
        x += (targetX - x) * EASE;
        y += (targetY - y) * EASE;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      raf = window.requestAnimationFrame(tick);
    };

    const updateFromTarget = (eventTarget: EventTarget | null) => {
      const target = eventTarget as HTMLElement | null;
      const overActiveTarget = Boolean(
        target?.closest(
          "[data-cursor-label], a, button, [role='button'], input, textarea, select",
        ),
      );

      if (overActiveTarget !== activeRef.current) {
        activeRef.current = overActiveTarget;
        setIsActive(overActiveTarget);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      updateFromTarget(event.target);
    };

    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      updateFromTarget(event.target);
    };

    const onLeave = () => {
      visibleRef.current = false;
      activeRef.current = false;
      setIsVisible(false);
      setIsActive(false);
    };

    raf = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`custom-cursor${isVisible ? " is-visible" : ""}${isActive ? " is-active" : ""}`}
    />
  );
}
