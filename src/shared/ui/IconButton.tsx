import { cn } from '../utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, IProps>(
  ({ className, isActive, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-transparent p-[0.5625rem] transition-colors hover:border-outlineGeneral hover:bg-whiteLight active:bg-blackLight disabled:pointer-events-none disabled:opacity-50',
          isActive && 'bg-whiteLight text-primary hover:bg-whiteMedium',
          className
        )}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
