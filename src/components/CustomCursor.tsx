"use client";

import { useEffect, useState } from "react";

/**
 * Custom crosshair cursor — desktop only (hover: hover + pointer: fine).
 * Tailwind hover sınıflarında da native cursor gizlenir.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Sadece hover destekleyen cihazlarda aktif (masaüstü)
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;

    setIsHidden(false);

    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a, button, [role='button'], input, textarea, select") !== null;
      setIsPointer(isInteractive);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Crosshair outer ring */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: isPointer ? 36 : 24,
          height: isPointer ? 36 : 24,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          border: `1px solid ${isPointer ? "#d946ef" : "#00d4ff"}`,
          borderRadius: "50%",
          backgroundColor: isPointer ? "rgba(217, 70, 239, 0.08)" : "transparent",
          transition:
            "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
        }}
      />
      {/* Center dot */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: 4,
          height: 4,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          backgroundColor: isPointer ? "#d946ef" : "#00d4ff",
          borderRadius: "50%",
          boxShadow: `0 0 8px ${isPointer ? "#d946ef" : "#00d4ff"}`,
        }}
      />
      {/* Corner brackets when over interactive */}
      {isPointer && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              left: position.x - 22,
              top: position.y - 22,
              width: 8,
              height: 8,
              transform: "translate(0, 0)",
              pointerEvents: "none",
              zIndex: 9999,
              borderTop: "1px solid #d946ef",
              borderLeft: "1px solid #d946ef",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              left: position.x + 14,
              top: position.y - 22,
              width: 8,
              height: 8,
              pointerEvents: "none",
              zIndex: 9999,
              borderTop: "1px solid #d946ef",
              borderRight: "1px solid #d946ef",
            }}
          />
        </>
      )}
    </>
  );
}
