import React, { FC } from 'react';
import { Card } from '@/shared';

interface IProps {
  description: string;
}

export const CourseDescription: FC<IProps> = ({ description }) => {
  return (
    <Card className='rounded-lg'>
      <h1 className='mb-6 text-4xl font-bold text-accent-primary-200'>
        О курсе
      </h1>
      <p className='whitespace-pre-wrap'>{description}</p>
    </Card>
  );
};
