"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type CardVariant = "default" | "interactive" | "word" | "success" | "error";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: CardVariant;
  selected?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-bg-card border border-gray-100",
  interactive:
    "bg-bg-card border-2 border-gray-100 hover:border-primary-light hover:shadow-lg cursor-pointer",
  word: "bg-bg-card border-2 border-gray-200 hover:border-primary hover:shadow-xl cursor-pointer",
  success: "bg-success-light/20 border-2 border-success",
  error: "bg-error-light/20 border-2 border-error",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "default",
      selected = false,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const isInteractive = variant === "interactive" || variant === "word";

    return (
      <motion.div
        ref={ref}
        whileHover={isInteractive && !disabled ? { scale: 1.02, y: -4 } : {}}
        whileTap={isInteractive && !disabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`
          rounded-2xl p-6 shadow-sm
          transition-all duration-200
          ${variantStyles[variant]}
          ${selected ? "ring-2 ring-primary ring-offset-2 border-primary" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Word Card - specifically for spelling choices
interface WordCardProps extends Omit<HTMLMotionProps<"button">, "children"> {
  word: string;
  state?: "default" | "correct" | "incorrect" | "selected";
  size?: "sm" | "md" | "lg";
}

export const WordCard = forwardRef<HTMLButtonElement, WordCardProps>(
  (
    { word, state = "default", size = "md", className = "", disabled, ...props },
    ref
  ) => {
    const stateStyles = {
      default:
        "bg-bg-card border-2 border-gray-200 hover:border-primary-light hover:shadow-xl text-text-primary",
      selected:
        "bg-primary-light/20 border-2 border-primary text-primary-dark",
      correct:
        "bg-success/10 border-2 border-success text-success animate-pulse",
      incorrect:
        "bg-error/10 border-2 border-error text-error",
    };

    const sizeStyles = {
      sm: "px-4 py-3 text-lg min-w-[120px]",
      md: "px-6 py-4 text-xl min-w-[160px]",
      lg: "px-8 py-5 text-2xl min-w-[200px]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && state === "default" ? { scale: 1.05, y: -4 } : {}}
        whileTap={!disabled && state === "default" ? { scale: 0.98 } : {}}
        animate={
          state === "incorrect"
            ? { x: [0, -10, 10, -10, 10, 0] }
            : state === "correct"
            ? { scale: [1, 1.1, 1] }
            : {}
        }
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          ...(state === "incorrect" && { duration: 0.4 }),
          ...(state === "correct" && { duration: 0.5 }),
        }}
        className={`
          rounded-2xl font-bold tracking-wide
          shadow-md hover:shadow-xl
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${stateStyles[state]}
          ${sizeStyles[size]}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {word}
      </motion.button>
    );
  }
);

WordCard.displayName = "WordCard";

export default Card;


