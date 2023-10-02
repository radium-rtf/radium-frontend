import { FC, MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/shared';

interface ButtonProps {
  color?: 'accent' | 'destructive' | 'outlined';
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  color = 'outlined',
  type,
  disabled,
  onClick,
  children,
  className,
}) => (
  <button
    className={cn(
      'cursor-pointer rounded-lg border px-6 py-2.5 text-center text-sm leading-tight outline-none outline-offset-0 transition focus-visible:outline-1 focus-visible:outline-white disabled:cursor-not-allowed',
      {
        'bg-transparent': color === 'outlined',
        'text-text-primary': color === 'outlined',
        'border-grey-300': color === 'outlined',
        'disabled:border-grey-400': color === 'outlined',
        'disabled:text-grey-100': color === 'outlined',
        'hover:bg-grey-500': color === 'outlined',
        'hover:border-grey-200': color === 'outlined',
        'active:bg-grey-700': color === 'outlined',
        'active:border-grey-400': color === 'outlined',
        'focus-visible:border-grey-600': color === 'outlined',
        'focus-visible:bg-grey-400': color === 'outlined',
        'focus-visible:active:border-grey-800': color === 'outlined',
        'focus-visible:active:bg-grey-700': color === 'outlined',
      },
      {
        'bg-accent-secondary-300': color === 'accent',
        'border-accent-secondary-400': color === 'accent',
        'text-accent-secondary-1100': color === 'accent',
        'disabled:bg-accent-secondary-900': color === 'accent',
        'disabled:border-accent-secondary-1000': color === 'accent',
        'hover:bg-accent-secondary-100': color === 'accent',
        'hover:border-accent-secondary-500': color === 'accent',
        'active:bg-accent-secondary-200': color === 'accent',
        'active:border-accent-secondary-500': color === 'accent',
      },
      {
        'bg-accent-destructive-300': color === 'destructive',
        'border-accent-destructive-200': color === 'destructive',
        'text-accent-destructive-1000': color === 'destructive',
        'disabled:bg-accent-destructive-800': color === 'destructive',
        'disabled:border-accent-destructive-900': color === 'destructive',
        'hover:bg-accent-destructive-100': color === 'destructive',
        'hover:border-accent-destructive-500': color === 'destructive',
        'active:bg-accent-destructive-200': color === 'destructive',
        'active:border-accent-destructive-700': color === 'destructive',
      },
      className
    )}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);
