'use client';

import { CardHeader, CardTitle, Icon } from '@/shared';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface CourseSectionHeaderEditProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isTask?: boolean;
}

export const CourseSectionHeaderEdit = forwardRef<HTMLButtonElement, CourseSectionHeaderEditProps>(
  ({ isTask, ...props }, ref) => {
    return (
      <CardHeader className='relative flex-row items-center gap-4 space-y-0'>
        <Icon type='question' className='shrink-0 text-primary' />
        <CardTitle className='text-base'>{isTask ? 'Задание' : 'Вопрос'}</CardTitle>
        <button {...props} ref={ref} type='button' className='drag absolute inset-0 rounded-sm'>
          <Icon
            type='handle-horizontal'
            className='absolute right-1/2 top-[2.25rem] -translate-y-1/2 translate-x-1/2'
          />
        </button>
      </CardHeader>
    );
  }
);

CourseSectionHeaderEdit.displayName = 'CourseSectionHeaderEdit';
