import { ButtonHTMLAttributes, FC } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'accent' | 'destructive' | 'outlined';
  asChild?: boolean;
}

export const Button: FC<ButtonProps> = ({
  color = 'outlined',
  asChild = false,
  children,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        [
          'text-foreground-default',
          'inline-flex',
          'cursor-pointer',
          'items-center',
          'gap-4',
          'rounded-lg',
          'border',
          'border-white/10',
          'bg-white/5',
          'px-4',
          'py-2',
          'font-mono',
          'text-[0.8125rem]',
          'leading-tight',
          '-outline-offset-1',
          'outline-white',
          'transition-colors',
          '[&:not(:disabled)]:hover:bg-white/10',
          'focus-visible:outline',
          '[&:not(:disabled)]:active:bg-black/5',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
        ],
        color === 'accent' && [
          'bg-secondary-default',
          'text-secondary-foreground',
          'border-black/10',
          '[&:not(:disabled)]:hover:bg-secondary-hovered',
          '[&:not(:disabled)]:active:bg-secondary-pressed',
        ],
        color === 'destructive' && [
          'bg-destructive-default',
          'text-destructive-foreground',
          'border-black/20',
          '[&:not(:disabled)]:hover:bg-destructive-hovered',
          '[&:not(:disabled)]:active:bg-destructive-pressed',
        ],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
