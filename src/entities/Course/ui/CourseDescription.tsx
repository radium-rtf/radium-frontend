import React, { FC } from 'react';
import { Card } from '@/shared';

interface IProps {
  description: string;
}

export const CourseDescription: FC<IProps> = ({ description }) => {
  return (
    <Card className='gap-6 rounded-lg'>
      <h1 className='font-mono text-[2rem] font-bold leading-[normal] text-primary-default'>
        О курсе
      </h1>
      <p className='whitespace-pre-wrap text-[0.815rem] leading-normal'>
        {description}
      </p>
    </Card>
  );
};
