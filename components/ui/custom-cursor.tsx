"use client";

import { useEffect, useRef, useState } from "react";

const EASE = 0.11;
const MERGE_SELECTOR = "[data-slot='button'], button";
const BASE_CURSOR_RADIUS = 10;
const ACTIVE_CURSOR_RADIUS = 23;
const MERGE_RELEASE_MS = 340;

function getDistanceToRect(x: number, y: number, rect: DOMRect) {
  const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
  const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
  return Math.hypot(dx, dy);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);
  const activeRef = useRef(false);
  const mergedButtonRef = useRef<HTMLElement | null>(null);
  const mergeReleaseTimeoutRef = useRef<number | null>(null);
  const mergedStateRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isButtonMerged, setIsButtonMerged] = useState(false);

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

    const setMergedState = (next: boolean) => {
      if (mergedStateRef.current !== next) {
        mergedStateRef.current = next;
        setIsButtonMerged(next);
      }
    };

    const clearReleaseTimeout = () => {
      if (mergeReleaseTimeoutRef.current !== null) {
        window.clearTimeout(mergeReleaseTimeoutRef.current);
        mergeReleaseTimeoutRef.current = null;
      }
    };

    const cleanupButtonFill = (button: HTMLElement | null) => {
      if (!button) {
        return;
      }

      button.removeAttribute("data-cursor-merge");
      button.style.removeProperty("--cursor-fill-x");
      button.style.removeProperty("--cursor-fill-y");
      button.style.removeProperty("--cursor-fill-scale");
    };

    const releaseMergedButton = () => {
      const button = mergedButtonRef.current;
      if (!button) {
        setMergedState(false);
        return;
      }

      clearReleaseTimeout();
      button.setAttribute("data-cursor-merge", "closing");
      button.style.setProperty("--cursor-fill-scale", "0");
      mergedButtonRef.current = null;
      setMergedState(false);

      mergeReleaseTimeoutRef.current = window.setTimeout(() => {
        cleanupButtonFill(button);
        mergeReleaseTimeoutRef.current = null;
      }, MERGE_RELEASE_MS);
    };

    const activateButtonFill = (button: HTMLElement, circleX: number, circleY: number) => {
      const rect = button.getBoundingClientRect();
      const localX = clamp(circleX - rect.left, 0, rect.width);
      const localY = clamp(circleY - rect.top, 0, rect.height);
      const maxRadius =
        Math.max(
          Math.hypot(localX, localY),
          Math.hypot(rect.width - localX, localY),
          Math.hypot(localX, rect.height - localY),
          Math.hypot(rect.width - localX, rect.height - localY),
        ) + 2;

      clearReleaseTimeout();

      button.style.setProperty("--cursor-fill-x", `${localX}px`);
      button.style.setProperty("--cursor-fill-y", `${localY}px`);
      button.style.setProperty("--cursor-fill-scale", "0");
      button.setAttribute("data-cursor-merge", "active");

      // Force the start state to commit before expanding to full button coverage.
      void button.offsetWidth;
      button.style.setProperty("--cursor-fill-scale", `${maxRadius}`);

      mergedButtonRef.current = button;
      setMergedState(true);
    };

    const syncButtonFill = (circleX: number, circleY: number) => {
      const cursorRadius =
        activeRef.current && !mergedStateRef.current ? ACTIVE_CURSOR_RADIUS : BASE_CURSOR_RADIUS;
      const buttons = Array.from(document.querySelectorAll<HTMLElement>(MERGE_SELECTOR)).filter(
        (button) => button.offsetParent !== null,
      );

      let contactedButton: HTMLElement | null = null;
      for (const button of buttons) {
        const rect = button.getBoundingClientRect();
        if (getDistanceToRect(circleX, circleY, rect) <= cursorRadius) {
          contactedButton = button;
          break;
        }
      }

      const currentButton = mergedButtonRef.current;
      if (contactedButton) {
        if (currentButton === contactedButton) {
          return;
        }

        if (currentButton && currentButton !== contactedButton) {
          releaseMergedButton();
        }

        activateButtonFill(contactedButton, circleX, circleY);
        return;
      }

      if (currentButton) {
        releaseMergedButton();
      }
    };

    const tick = () => {
      const el = ref.current;
      if (el) {
        x += (targetX - x) * EASE;
        y += (targetY - y) * EASE;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      syncButtonFill(x, y);
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
      clearReleaseTimeout();
      cleanupButtonFill(mergedButtonRef.current);
      mergedButtonRef.current = null;
      setIsVisible(false);
      setIsActive(false);
      setMergedState(false);
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
      clearReleaseTimeout();
      cleanupButtonFill(mergedButtonRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`custom-cursor${isVisible ? " is-visible" : ""}${isActive ? " is-active" : ""}${isButtonMerged ? " is-button-merged" : ""}`}
    />
  );
}
