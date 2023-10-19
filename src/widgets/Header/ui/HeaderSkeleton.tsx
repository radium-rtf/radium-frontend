import React from 'react';

export const HeaderSkeleton = () => {
  return (
    <header
      className='
        sticky
        top-0
        z-10
        flex
        items-center
        justify-between
        bg-bg-page
        px-12
        pb-9
        pt-12
        '
    >
      <div className='flex items-center gap-6'>
        <div className='h-12 w-12 animate-pulse rounded-lg bg-grey-400' />
        <div className='h-10 w-48 animate-pulse rounded bg-grey-400' />
      </div>
      <div className='flex items-center gap-6'>
        <div className='h-5 w-32 animate-pulse rounded-lg bg-grey-400' />
        <div className='h-12 w-12 animate-pulse rounded-full bg-grey-400' />
      </div>
    </header>
  );
};
