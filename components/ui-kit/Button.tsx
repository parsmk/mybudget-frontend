"use client";

import React from "react";

type ButtonVariants = "primary" | "secondary" | "danger" | "outline";

type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  type?: "submit" | "button";
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
};

export const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariants, string> = {
    primary: "bg-primary/80 outline-tertiary/80 text-white",
    secondary: "bg-secondary/80 outline-tertiary/80 text-white",
    danger: "bg-danger/70 outline-danger/80 text-white",
    outline: "bg-background text-foreground/80",
  };

  const variantInteractivity: Record<ButtonVariants, string> = {
    primary: "hover:outline-tertiary hover:bg-primary",
    secondary: "hover:outline-tertiary hover:bg-secondary",
    danger: "hover:outline-danger hover:bg-danger/90",
    outline: "hover:text-foreground hover:outline-foreground",
  };

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : null;

  const loadingClass = loading ? "opacity-50 cursor-wait" : null;

  const sizeClasses: Record<ButtonSizes, string> = {
    sm: `${fullWidth ? "w-full" : "w-[5rem]"} h-[2rem]`,
    md: `${fullWidth ? "w-full" : "w-[10rem]"} h-[3rem]`,
    lg: `${fullWidth ? "w-full" : "w-[15rem]"} h-[4rem]`,
  };

  return (
    <button
      disabled={disabled}
      className={`block rounded-md text-center font-semibold outline outline-1.5 transition 
        ${disabledClass ?? ""} ${loadingClass ?? ""} ${variantClasses[variant]} ${!disabled || !loading ? `${variantInteractivity[variant]} cursor-pointer` : ""} ${sizeClasses[size]}
      `}
      type={type}
      onClick={() => onClick?.()}
    >
      {children ?? type}
    </button>
  );
};
