"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type SplitMode = "words" | "chars";

interface SplitTextProps {
  children: string;
  className?: string;
  mode?: SplitMode;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function SplitText({
  children,
  className = "",
  mode = "words",
  stagger = 0.04,
  duration = 0.7,
  delay = 0,
  once = true,
  as = "span",
}: SplitTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-50px" });

  const parts = mode === "words" ? children.split(" ") : children.split("");
  const Tag = as;

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {parts.map((part, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, rotateX: 45 }}
            animate={
              inView
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "110%", opacity: 0, rotateX: 45 }
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: EASE,
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {part}
            {mode === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
