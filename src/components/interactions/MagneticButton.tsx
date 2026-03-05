"use client";

import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a" | "div";
  strength?: number;
  href?: string;
  target?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  as = "div",
  strength = 0.35,
  href,
  target,
  onClick,
  type,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  function handleMove(e: MouseEvent) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const Tag = as === "a" ? motion.a : as === "button" ? motion.button : motion.div;

  const props: Record<string, unknown> = {
    ref,
    style: isTouch ? {} : { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className,
    onClick,
    "aria-label": ariaLabel,
  };

  if (as === "a") {
    props.href = href;
    props.target = target;
  }
  if (as === "button") {
    props.type = type || "button";
  }

  return <Tag {...props}>{children}</Tag>;
}
