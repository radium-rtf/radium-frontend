'use client';

import React, { FC } from 'react';
import { List } from '@/shared';

export const GroupMenuSkeleton: FC = () => {
  return (
    <nav className='sticky -ml-6 w-64'>
      <h2
        className='
        mb-4
        ml-6
        h-[1.625rem]
        w-[10.75rem]
        animate-pulse
        rounded border-white/10
        bg-grey-400'
      ></h2>
      <List>
        {[
          <div
            key='Ведомость'
            className='flex select-none items-center gap-4 rounded-lg px-6 py-2'
          >
            <div className='h-[1.125rem] w-[1.125rem] flex-shrink-0 animate-pulse rounded bg-grey-400' />
            <h2 className='h-[1.125rem] w-full animate-pulse rounded bg-grey-400' />
          </div>,
          ...Array.from({ length: 5 }).map((_, index) => {
            return (
              <div
                key={index}
                className='
                flex 
                select-none
                items-center
                gap-4
                rounded-lg
                px-6 py-2'
              >
                <div className='h-[1.125rem] w-[1.125rem] flex-shrink-0 animate-pulse rounded-full bg-grey-400' />
                <h2 className='h-[1.125rem] w-full animate-pulse rounded bg-grey-400' />
              </div>
            );
          }),
        ]}
      </List>
    </nav>
  );
};
