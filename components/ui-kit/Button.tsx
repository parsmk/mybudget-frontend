"use client";

import React from "react";

type ButtonVariants = "primary" | "secondary" | "danger" | "outline";

type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  type?: "submit" | "button";
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariants, string> = {
    primary:
      "bg-primary/80 outline-tertiary/80 hover:outline-tertiary hover:bg-primary text-white",
    secondary:
      "bg-secondary/80 outline-tertiary/80 hover:outline-tertiary hover:bg-secondary text-white",
    danger:
      "bg-danger/70 outline-danger/80 hover:outline-danger hover:bg-danger/90",
    outline:
      "bg-background text-foreground/80 outline-foreground/80 hover:text-foreground hover:outline-foreground",
  };

  const sizeClasses: Record<ButtonSizes, string> = {
    sm: "w-[5rem] h-[2rem]",
    md: "w-[10rem] h-[3rem]",
    lg: "w-[15rem] h-[4rem]",
  };

  return (
    <button
      className={`
        block rounded-md 
        text-center font-semibold
        outline outline-1.5
        transition cursor-pointer
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
      type={type}
      onClick={() => onClick?.()}
    >
      {children ?? type}
    </button>
  );
};
