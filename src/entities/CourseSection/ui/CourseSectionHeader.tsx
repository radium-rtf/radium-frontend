'use client';

import { CardHeader, CardTitle, Icon } from '@/shared';
import { FC } from 'react';

type CourseSectionHeaderProps = {
  isTask?: boolean;
};

export const CourseSectionHeader: FC<CourseSectionHeaderProps> = ({ isTask }) => {
  return (
    <CardHeader className='flex-row items-center gap-4 space-y-0'>
      <Icon type='question' className='shrink-0 text-primary' />
      <CardTitle className='text-base'>{isTask ? 'Задание' : 'Вопрос'}</CardTitle>
    </CardHeader>
  );
};
