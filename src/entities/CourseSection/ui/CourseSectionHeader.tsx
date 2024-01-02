'use client';

import { CardHeader, CardTitle, Icon } from '@/shared';
import { FC } from 'react';

export const CourseSectionHeader: FC = () => {
  return (
    <CardHeader className='flex-row items-center gap-4 space-y-0'>
      <Icon type='question' className='shrink-0 text-primary' />
      <CardTitle className='text-base'>Вопрос</CardTitle>
    </CardHeader>
  );
};
