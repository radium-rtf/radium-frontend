'use client';
import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string;
}

export const Checkbox: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ className, labelClassName, children, ...props }, ref) => {
    return (
      <label
        className={cn(
          'group relative flex cursor-pointer items-center gap-4 [&:has(:disabled)]:cursor-not-allowed',
          labelClassName
        )}
      >
        <input
          ref={ref}
          {...props}
          type='checkbox'
          className={cn(
            'peer absolute left-0 top-0 h-0 w-0 appearance-none outline-none',
            className
          )}
        />
        <div
          className='
        group
        flex
        aspect-square
        h-[1.125rem] items-center
        justify-center
        rounded
        border
        border-grey-100
        outline-white
        transition-colors
        group-hover:border-grey-100
        group-hover:bg-grey-500
        group-active:border-grey-100
        group-active:bg-transparent
        peer-checked:border-accent-primary-300
        peer-checked:bg-accent-primary-200
        peer-checked:first:translate-x-2
        group-hover:peer-checked:bg-accent-primary-100
        group-active:peer-checked:border-accent-primary-400
        group-active:peer-checked:bg-accent-primary-300
        peer-focus-visible:border-grey-600
        peer-focus-visible:bg-grey-400
        peer-focus-visible:outline
        peer-focus-visible:peer-checked:border-accent-primary-300
        peer-focus-visible:peer-checked:bg-accent-primary-200
        peer-focus-visible:peer-active:border-grey-800
        peer-focus-visible:peer-active:bg-grey-700
        peer-focus-visible:peer-active:peer-checked:border-accent-primary-400
        peer-focus-visible:peer-active:peer-checked:bg-accent-primary-300
        peer-disabled:border-grey-300
        group-hover:peer-disabled:border-grey-300
        group-hover:peer-disabled:bg-transparent
        peer-disabled:peer-checked:border-accent-primary-500
        peer-disabled:peer-checked:bg-accent-primary-400
        group-hover:peer-disabled:peer-checked:border-accent-primary-500
        group-hover:peer-disabled:peer-checked:bg-accent-primary-400
        peer-checked:[&>svg]:opacity-100
        '
        >
          <svg
            viewBox='0 0 9 6'
            className='
          h-[0.375rem]
          w-[0.5625rem]
          -translate-y-1/4
          -rotate-45
          stroke-2
          opacity-0
          transition
         '
          >
            <line x1='0' y1='0' x2='0' y2='6' stroke='black' />
            <line x1='0' y1='6' x2='9' y2='6' stroke='black' />
          </svg>
        </div>
        {children && (
          <span className='select-none text-[0.8125rem] text-text-primary'>
            {children}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
