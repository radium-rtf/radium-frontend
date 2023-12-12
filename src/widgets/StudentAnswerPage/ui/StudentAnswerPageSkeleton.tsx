import React from 'react';
import { CheckAnswerSectionSkeleton } from '@/widgets/StudentAnswerPage/ui/CheckAnswerSectionSkeleton';

export const StudentAnswerPageSkeleton = () => {
  return (
    <main className='m-auto items-center'>
      <div className='mx-auto max-w-[45rem]'>
        <CheckAnswerSectionSkeleton></CheckAnswerSectionSkeleton>
        <CheckAnswerSectionSkeleton></CheckAnswerSectionSkeleton>
      </div>
    </main>
  );
};
