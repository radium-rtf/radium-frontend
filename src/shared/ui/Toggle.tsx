'use client';
import React, { FC, InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const Toggle: FC<IProps> = ({ className, ...props }) => {
  return (
    <label
      className={cn(
        'border-grey-100 hover:bg-grey-500 [&:has(:checked):has(:disabled)]:border-accent-primary-400 [&:has(:checked)]:border-accent-primary-200 [&:has(:disabled)]:border-grey-300 relative flex h-[1.125rem] w-8 cursor-pointer items-center rounded-full border p-[0.1875rem] text-sm outline-white transition-all hover:p-0.5 [&:has(:active):has(:disabled)]:p-[0.1875rem] [&:has(:active)]:p-1 [&:has(:checked):has(:active)]:p-[0.1875rem] [&:has(:disabled)]:cursor-not-allowed [&:has(:focus-visible)]:outline [&:hover:has(:checked)]:p-[0.0625rem] [&:hover:has(:disabled)]:bg-transparent [&:hover:has(:disabled)]:p-[0.1875rem]',
        className
      )}
    >
      <input type='checkbox' className='peer appearance-none' {...props} />
      <div
        className='bg-grey-100 peer-checked:bg-accent-primary-200 peer-disabled:bg-grey-300
        peer-checked:peer-disabled:bg-accent-primary-400 aspect-square h-full
        rounded-full
        transition-all
        peer-checked:ml-[0.875rem]'
      />
    </label>
  );
};
