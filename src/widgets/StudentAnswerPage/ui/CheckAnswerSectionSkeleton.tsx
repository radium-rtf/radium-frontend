import { cn } from '@/shared';
import React, { FC } from 'react';

export const CheckAnswerSectionSkeleton: FC = () => (
  <div
    className={cn(
      'flex',
      'm-auto',
      'h-[23.0625rem]',
      'w-[45rem]',
      'rounded-[1rem]',
      'bg-background-card',
      'my-[2rem]'
    )}
  >
    <main className='inline-block h-full w-full p-[1.5rem]'>
      <div
        className='bg-grey-400
                    mb-4
                    h-8
                    w-full animate-pulse rounded
                    border border-white/10'
      />

      <div
        className='bg-grey-400
                    mb-4
                    h-5
                    w-full animate-pulse rounded
                    border border-white/10'
      />

      <div
        className={cn(
          'p-4',
          'min-h-[8rem]',
          'max-h-96',
          'overflow-y-auto',
          'scrollbar',
          'break-words',
          'outline-none',
          'bg-transparent',
          'transition-colors',
          'leading-normal',
          'bg-grey-400',
          'animate-pulse',
          'rounded-lg',
          'border',
          'border-white/10',
          'mb-[1rem]'
        )}
      />
      <div
        className='
        bg-grey-400
        h-[2.25rem]
        w-full animate-pulse rounded
        border border-white/10
        px-[1rem]
        py-[0.5625rem]'
      />

      <div
        className='
        my-[1rem]
        flex
        items-center
        justify-end
        gap-4'
      >
        <div
          className='
                    bg-grey-400
                    h-[2.25rem]
                    w-[16rem] animate-pulse rounded
                    border border-white/10
                    px-[1rem]
                    py-[0.5625rem]'
        />

        <div
          className='
                    bg-grey-400
                    h-[2.25rem]
                    w-[16rem] animate-pulse rounded
                    border border-white/10
                    px-[1rem]
                    py-[0.5625rem]'
        />
      </div>
    </main>
  </div>
);
