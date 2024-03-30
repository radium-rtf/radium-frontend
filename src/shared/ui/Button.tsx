import { cn } from '@/shared';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'font-NTSomic shrink-0 text-base leading-tight ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-[0.5rem] border border-blackMedium font-normal leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-accent-secondary text-accent-secondary-foreground hover:bg-accent-secondary-hovered active:bg-accent-secondary-pressed',
        destructive:
          'bg-accent-destructive text-accent-destructive-foreground hover:bg-accent-destructive-hovered active:bg-accent-destructive-pressed',
        outline:
          'border border-outlineGeneral bg-whiteLight hover:bg-whiteMedium active:bg-blackLight',
      },
      size: {
        default: 'h-9 px-4 py-2',
        wide: 'w-64 h-9 px-4 py-2 justify-between',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
