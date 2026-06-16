"use client";

import { useEffect, useState } from "react";

interface TerminalBootProps {
  lines: string[];
  typingSpeed?: number;
  lineDelay?: number;
  className?: string;
}

export default function TerminalBoot({
  lines,
  typingSpeed = 30,
  lineDelay = 200,
  className = "",
}: TerminalBootProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }
    const line = lines[currentLine] ?? "";
    if (currentText.length < line.length) {
      const timer = setTimeout(() => {
        setCurrentText(line.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((n) => n + 1);
        setCurrentText("");
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentText, lines, typingSpeed, lineDelay]);

  return (
    <div
      className={`font-tech text-xs sm:text-sm space-y-1 ${className}`}
      aria-label="Terminal boot sequence"
    >
      {lines.slice(0, currentLine).map((line, i) => (
        <div key={i} className="text-emerald-400/80">
          <span className="text-cyan-400/60 mr-2">$</span>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="text-emerald-400">
          <span className="text-cyan-400/60 mr-2">$</span>
          {currentText}
          <span
            className="inline-block w-2 h-3 sm:h-4 bg-emerald-400 ml-0.5 align-middle"
            style={{ animation: "blink 0.8s step-end infinite" }}
            aria-hidden="true"
          />
        </div>
      )}
      {done && (
        <div className="text-cyan-400 pt-2">
          <span className="text-fuchsia-400/60 mr-2">›</span>
          ready.
        </div>
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
