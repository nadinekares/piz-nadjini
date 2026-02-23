"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const DARK_THRESHOLD = 52;

function parseColor(value: string): Rgba | null {
  if (!value || value === "transparent" || value === "none") {
    return null;
  }

  const match = value
    .replaceAll("/", " ")
    .match(/rgba?\(([^)]+)\)|color\([^)]*\s([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/i);

  if (!match) {
    return null;
  }

  if (match[1]) {
    const [r, g, b, a = "1"] = match[1].split(/[,\s]+/).filter(Boolean);
    return {
      r: Number.parseFloat(r),
      g: Number.parseFloat(g),
      b: Number.parseFloat(b),
      a: Number.parseFloat(a),
    };
  }

  return {
    r: Number.parseFloat(match[2] ?? "0") * 255,
    g: Number.parseFloat(match[3] ?? "0") * 255,
    b: Number.parseFloat(match[4] ?? "0") * 255,
    a: Number.parseFloat(match[5] ?? "1"),
  };
}

function luminance({ r, g, b }: Rgba) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isDarkColor(value: string) {
  const parsed = parseColor(value);
  if (!parsed || parsed.a < 0.15) {
    return false;
  }

  return luminance(parsed) < DARK_THRESHOLD;
}

function isOverDarkElement(start: Element | null) {
  let current: Element | null = start;
  let depth = 0;

  while (current && depth < 8) {
    const style = window.getComputedStyle(current);

    const hasDarkDataFlag =
      current instanceof HTMLElement && current.dataset.cursorDark === "true";

    if (
      isDarkColor(style.backgroundColor) ||
      isDarkColor(style.fill) ||
      isDarkColor(style.stroke) ||
      isDarkColor(style.color) ||
      hasDarkDataFlag
    ) {
      return true;
    }

    current = current.parentElement;
    depth += 1;
  }

  return false;
}

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 560, damping: 44, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 560, damping: 44, mass: 0.2 });

  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isDarkSurface, setIsDarkSurface] = useState(false);

  const circleScale = useMemo(() => (isPressed ? 0.82 : 1), [isPressed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!mediaQuery.matches) {
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);

      const hovered = document.elementFromPoint(event.clientX, event.clientY);
      setIsDarkSurface(isOverDarkElement(hovered));
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120]"
      style={{ x: springX, y: springY, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.16 }}
    >
      <motion.div
        className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        animate={{
          scale: circleScale,
          borderColor: isDarkSurface ? "#ff2ea6" : "#0a0a0a",
          backgroundColor: isDarkSurface ? "rgba(255,46,166,0.10)" : "rgba(10,10,10,0.04)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.45 }}
      />
    </motion.div>
  );
}
