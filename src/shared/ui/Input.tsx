import React, { ChangeEventHandler, FC, ReactNode } from 'react';
import { cn } from '@/shared';

interface TextInputProps {
  defaultValue?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: string;
  className?: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
}

export const Input: FC<TextInputProps> = ({
  defaultValue,
  disabled,
  onChange,
  children,
  className,
  type,
  placeholder,
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
          'border-grey-300',
          '-outline-offset-1',
          'text-text-secondary',
          'disabled:border-grey-600',
          'hover:bg-grey-600',
          '[&:has(:disabled)]:text-grey-200',
          '[&:has(:disabled)]:border-grey-600',
          '[&:has(:disabled)]:cursor-not-allowed',
          '[&:has(:focus)]:bg-grey-800',
          '[&:has(:focus)]:border-accent-primary-200',
        ],
        className
      )}
    >
      <input
        type={type}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn([
          'peer',
          'flex-grow',
          'cursor-text',
          'bg-transparent',
          'outline-none',
          'disabled:cursor-not-allowed',
          'text-text-primary',
          'text-sm',
          'placeholder:text-text-secondary',
        ])}
      />
      {children && <span className='text-sm'>{children}</span>}
    </label>
  );
};
