import React, { FC, InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Radio: FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, id, children, ...props }, ref) => {
    return (
      <label
        className={cn(
          'group relative flex cursor-pointer items-center gap-4 [&:has(:disabled)]:cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          id={id}
          type='radio'
          {...props}
          className='peer absolute left-0 top-0 h-0 w-0 appearance-none'
        />
        <div
          className='
        peer-disabled: flex aspect-square h-[1.125rem] items-center justify-center rounded-full
        border border-grey-100 outline-white
        transition-colors after:block after:aspect-square after:h-0 after:rounded-full
        after:bg-accent-primary-200 after:transition-all after:content-[""]
        peer-checked:border-accent-primary-200 peer-checked:after:h-[0.625rem]
        peer-hover:bg-grey-400 peer-hover:peer-checked:after:h-3 peer-focus-visible:outline peer-disabled:border-grey-500
        peer-disabled:peer-checked:border-accent-primary-400
        peer-disabled:peer-checked:after:bg-accent-primary-400
        peer-hover:peer-disabled:bg-transparent
       '
        ></div>
        {children && (
          <span className='select-none text-[0.8125rem] leading-tight text-text-primary'>
            {children}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
