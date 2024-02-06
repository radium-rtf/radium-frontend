import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Icon } from './Icon';
import { cn } from '../utils/cn';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconType?: Icon;
  iconClassName?: string;
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, iconClassName, inputClassName, children, iconType, ...props }, ref) => {
    return (
      <label
        className={cn(
          [
            'group',
            'flex',
            'gap-4',
            'px-4',
            'py-2',
            'border',
            'rounded-lg',
            'transition',
            'cursor-text',
            'items-center',
            'font-NTSomic',
            'outline-white',
            'border-white/10',
            '-outline-offset-1',
            'text-foreground-secondary',
            'disabled:opacity-50',
            '[&:not(:has(:disabled))]hover:bg-white/5',
            '[&:has(:disabled)]:cursor-not-allowed',
            '[&:has(:focus)]:bg-black/10',
            '[&:has(:focus)]:border-primary-default',
          ],
          className
        )}
      >
        {!!iconType && (
          <Icon
            className={cn('text-foreground-secondary shrink-0', iconClassName)}
            type={iconType}
          />
        )}
        <input
          ref={ref}
          {...props}
          className={cn(
            'peer',
            'w-full',
            'flex-grow',
            'cursor-text',
            'bg-transparent',
            'font-NTSomic',
            'text-[0.8125rem]',
            'leading-tight',
            'text-foreground-default',
            'outline-none',
            'placeholder:text-foreground-secondary',
            'disabled:cursor-not-allowed',
            inputClassName
          )}
        />
        {children}
      </label>
    );
  }
);

Input.displayName = 'Input';
