import { Card } from '@/shared';

export const CourseCardSkeleton = () => {
  return (
    <Card className='flex flex-col gap-4 rounded-lg'>
      <header className='flex w-full items-center gap-4'>
        <div className='bg-grey-400 h-[4.5rem] w-[4.5rem] flex-shrink-0 animate-pulse rounded object-cover' />
        <div className='flex w-full flex-col gap-3'>
          <div className='bg-grey-400 h-5 w-full animate-pulse rounded-lg' />
          <div className='bg-grey-400 h-9 w-full animate-pulse rounded-lg' />
        </div>
      </header>
      <div className='bg-grey-400 h-24 flex-grow animate-pulse rounded-lg' />
      <footer className='flex items-center gap-2'>
        <div className='flex flex-grow items-center gap-2'>
          <div className='bg-grey-400 h-[1.125rem] w-[1.125rem] animate-pulse rounded' />
          <div className='bg-grey-400 h-5 w-32 animate-pulse rounded-lg' />
        </div>
        <div className='bg-grey-400 h-9 w-20 shrink-0 animate-pulse rounded-lg'></div>
      </footer>
    </Card>
  );
};
