"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: "hover" | "inView";
  speed?: number;
  once?: boolean;
}

export function ScrambleText({
  text,
  className = "",
  trigger = "hover",
  speed = 30,
  once = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once });
  const [display, setDisplay] = useState(text);
  const [isTouch, setIsTouch] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  const scramble = useCallback(() => {
    if (once && hasPlayed.current) return;
    hasPlayed.current = true;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, once]);

  useEffect(() => {
    if (trigger === "inView" && inView) scramble();
  }, [inView, trigger, scramble]);

  useEffect(() => {
    setDisplay(text);
    hasPlayed.current = false;
  }, [text]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" && !isTouch ? scramble : undefined}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </span>
  );
}
