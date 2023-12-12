import React, { FC } from 'react';

export const CourseHeaderSkeleton: FC = () => (
  <div
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
    <div className='flex w-full items-center gap-6'>
      <div className='h-8 w-8 flex-shrink-0 animate-pulse rounded bg-grey-400 object-cover' />
      <div className='h-8 w-full animate-pulse rounded bg-grey-400'></div>
    </div>

    <div className='flex items-center'>
      <div className='h-4 w-16 animate-pulse  rounded bg-grey-400 mx-[1.5rem]' />
      <div className='h-12 w-12 flex-shrink-0 animate-pulse rounded-full bg-grey-400'></div>
    </div>
  </div>
);
