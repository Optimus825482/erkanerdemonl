"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function GlowingButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: GlowingButtonProps) {
  const baseStyles =
    "relative px-8 py-3 rounded-lg font-semibold overflow-hidden";

  const variantStyles = {
    primary: "bg-gradient-to-r from-[#0ff] to-[#00cccc] text-black",
    secondary: "bg-gradient-to-r from-[#ff2b9d] to-[#cc2280] text-white",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ boxShadow: "0 0 0 rgba(0, 255, 255, 0)" }}
      animate={{
        boxShadow: disabled
          ? "0 0 0 rgba(0, 255, 255, 0)"
          : [
              "0 0 20px rgba(0, 255, 255, 0.3)",
              "0 0 40px rgba(0, 255, 255, 0.5)",
              "0 0 20px rgba(0, 255, 255, 0.3)",
            ],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* Shimmer efekti */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
