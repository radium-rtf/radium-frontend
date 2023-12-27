import React, { FC } from 'react';

export const CourseHeaderSkeleton: FC = () => (
  <div
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
    <div className='flex w-full items-center gap-6'>
      <div className='bg-grey-400 h-8 w-8 flex-shrink-0 animate-pulse rounded object-cover' />
      <div className='bg-grey-400 h-8 w-full animate-pulse rounded'></div>
    </div>

    <div className='flex items-center'>
      <div className='bg-grey-400 mx-[1.5rem] h-4  w-16 animate-pulse rounded' />
      <div className='bg-grey-400 h-12 w-12 flex-shrink-0 animate-pulse rounded-full'></div>
    </div>
  </div>
);
