"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollMorphProps {
  className?: string;
  size?: number;
  color?: string;
}

export function ScrollMorph({
  className = "",
  size = 300,
  color = "rgba(212, 160, 18, 0.06)",
}: ScrollMorphProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "50% 60% 30% 60% / 30% 60% 70% 40%",
      "60% 40% 60% 30% / 40% 50% 60% 50%",
      "60% 40% 30% 70% / 60% 30% 70% 40%",
    ]
  );

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius,
        rotate,
        scale,
      }}
      className={`pointer-events-none ${className}`}
    />
  );
}
