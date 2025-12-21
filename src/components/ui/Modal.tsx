"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  full: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  className = "",
}: ModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className={`
              relative w-full ${sizeStyles[size]}
              bg-bg-card rounded-3xl shadow-2xl
              max-h-[90vh] overflow-auto
              ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 pb-0">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-2xl font-bold text-text-primary font-display"
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      text-text-muted hover:text-text-primary
                      hover:bg-bg-secondary
                      transition-colors
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    "
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Confirmation modal
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmModalProps) {
  const variantStyles = {
    danger: "danger",
    warning: "primary",
    default: "primary",
  } as const;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-text-secondary mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          variant={variantStyles[variant]}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

// Achievement unlock modal
interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    name: string;
    description: string;
    icon: string;
  };
}

export function AchievementModal({
  isOpen,
  onClose,
  achievement,
}: AchievementModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="text-7xl mb-4"
        >
          {achievement.icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Achievement Unlocked!
          </p>
          <h3 className="text-2xl font-bold text-text-primary mb-2 font-display">
            {achievement.name}
          </h3>
          <p className="text-text-secondary mb-6">{achievement.description}</p>
          <Button onClick={onClose} fullWidth>
            Awesome!
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
}

// Results modal for end of challenge
interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
  correct: number;
  total: number;
  message?: string;
}

export function ResultsModal({
  isOpen,
  onClose,
  onContinue,
  correct,
  total,
  message,
}: ResultsModalProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPerfect = correct === total;
  const isGood = percentage >= 70;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-6xl mb-4"
        >
          {isPerfect ? "🎉" : isGood ? "⭐" : "💪"}
        </motion.div>
        <h3 className="text-2xl font-bold text-text-primary mb-2 font-display">
          {isPerfect
            ? "Perfect Score!"
            : isGood
            ? "Great Job!"
            : "Keep Practising!"}
        </h3>
        <p className="text-4xl font-bold text-primary mb-2">
          {correct}/{total}
        </p>
        <p className="text-text-secondary mb-6">
          {message || `You got ${percentage}% correct!`}
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose} fullWidth>
            Back Home
          </Button>
          {onContinue && (
            <Button onClick={onContinue} fullWidth>
              {correct < total ? "Learn Words" : "Continue"}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Modal;


