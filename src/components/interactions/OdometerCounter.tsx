"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";

interface OdometerCounterProps {
  target: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function OdometerCounter({
  target,
  suffix = "",
  className = "",
  duration = 2,
}: OdometerCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
    duration: duration * 1000,
  });
  const display = useTransform(springVal, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, target, motionVal]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
