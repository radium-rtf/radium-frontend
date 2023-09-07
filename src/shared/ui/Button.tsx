import { FC, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/shared";

interface ButtonProps {
  color?: "accent" | "destructive" | "outlined";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  color = "outlined",
  type,
  disabled,
  onClick,
  children,
}) => (
  <button
    className={cn(
      "text-sm px-6 py-2.5 text-center leading-tight border rounded-lg transition cursor-pointer disabled:cursor-not-allowed outline-none focus-visible:outline-1 focus-visible:outline-white outline-offset-0",
      {
        "bg-accent-secondary-300": color === "accent",
        "border-accent-secondary-400": color === "accent",
        "text-accent-secondary-1100": color === "accent",
        "disabled:bg-accent-secondary-900": color === "accent",
        "disabled:border-accent-secondary-1000": color === "accent",
        "hover:bg-accent-secondary-100": color === "accent",
        "hover:border-accent-secondary-500": color === "accent",
        "active:bg-accent-secondary-200": color === "accent",
        "active:border-accent-secondary-500": color === "accent",
      },
    )}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);
