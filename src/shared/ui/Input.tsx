import React, { FC, InputHTMLAttributes } from 'react';
import { cn } from '@/shared';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<TextInputProps> = ({
  className,
  children,
  ...props
}: TextInputProps) => {
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
      <input
        {...props}
        className='
        peer 
        w-full
        flex-grow
        cursor-text
        bg-transparent
        font-mono
        text-sm
        text-text-primary
        outline-none
        placeholder:text-text-secondary
        disabled:cursor-not-allowed'
      />
      {children && <span className='text-sm'>{children}</span>}
    </label>
  );
};
