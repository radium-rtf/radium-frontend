import React from 'react';

export const HeaderSkeleton = () => {
  return (
    <header
      className='
        bg-bg-page
        sticky
        top-0
        z-10
        flex
        items-center
        justify-between
        px-12
        pb-9
        pt-12
        '
    >
      <div className='flex items-center gap-6'>
        <div className='bg-grey-400 h-12 w-12 animate-pulse rounded-lg' />
        <div className='bg-grey-400 h-10 w-48 animate-pulse rounded' />
      </div>
      <div className='flex items-center gap-6'>
        <div className='bg-grey-400 h-5 w-32 animate-pulse rounded-lg' />
        <div className='bg-grey-400 h-12 w-12 animate-pulse rounded-full' />
      </div>
    </header>
  );
};
