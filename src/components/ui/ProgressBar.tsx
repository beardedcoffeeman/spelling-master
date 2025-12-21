"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "gradient";
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  current,
  total,
  showLabel = true,
  size = "md",
  variant = "default",
  animated = true,
  className = "",
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  const sizeStyles = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantStyles = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    gradient: "bg-gradient-to-r from-primary via-purple-500 to-pink-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Progress
          </span>
          <span className="text-sm font-bold text-text-primary">
            {current} / {total}
          </span>
        </div>
      )}
      <div
        className={`
          w-full bg-bg-secondary rounded-full overflow-hidden
          ${sizeStyles[size]}
        `}
      >
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.5 : 0,
            ease: "easeOut",
          }}
          className={`
            h-full rounded-full
            ${variantStyles[variant]}
          `}
        />
      </div>
    </div>
  );
}

// Circular progress for achievements/stats
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning";
  showPercentage?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showPercentage = true,
  children,
  className = "",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: "stroke-primary",
    success: "stroke-success",
    warning: "stroke-warning",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="stroke-bg-secondary"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <motion.circle
          className={variantColors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          showPercentage && (
            <span className="text-2xl font-bold text-text-primary">
              {Math.round(percentage)}%
            </span>
          )
        )}
      </div>
    </div>
  );
}

// Step indicator for multi-step flows
interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  className = "",
}: StepIndicatorProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <motion.div
            initial={false}
            animate={{
              scale: index === currentStep ? 1.1 : 1,
              backgroundColor:
                index < currentStep
                  ? "var(--success)"
                  : index === currentStep
                  ? "var(--primary)"
                  : "var(--bg-secondary)",
            }}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              text-sm font-bold
              ${
                index <= currentStep
                  ? "text-white"
                  : "text-text-muted"
              }
            `}
          >
            {index < currentStep ? "✓" : index + 1}
          </motion.div>
          {index < steps.length - 1 && (
            <div
              className={`
                w-8 h-1 mx-1 rounded-full
                ${index < currentStep ? "bg-success" : "bg-bg-secondary"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;


