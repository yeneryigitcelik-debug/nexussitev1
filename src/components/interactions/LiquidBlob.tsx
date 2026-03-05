"use client";

import { useRef, useEffect, useState, type ReactNode, type MouseEvent } from "react";

interface LiquidBlobProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function LiquidBlob({
  children,
  className = "",
  color = "rgba(212, 160, 18, 0.08)",
}: LiquidBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (isTouch || !containerRef.current || !blobRef.current) return;
    const container = containerRef.current;
    const blob = blobRef.current;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    let raf: number;

    function loop() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      blob.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function onMove(e: globalThis.MouseEvent) {
      const rect = container.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    }

    function onEnter() {
      blob.style.opacity = "1";
    }

    function onLeave() {
      blob.style.opacity = "0";
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!isTouch && (
        <div
          ref={blobRef}
          className="pointer-events-none absolute w-[250px] h-[250px] rounded-full blur-[80px] opacity-0 transition-opacity duration-500 z-0"
          style={{
            background: color,
            animation: "blob-morph 8s ease-in-out infinite",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
