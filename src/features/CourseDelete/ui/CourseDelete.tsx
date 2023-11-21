'use client';
import { Button, Icon } from '@/shared';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { CourseDeleteHandler } from '../lib/courseDeleteHandler';

interface CourseDeleteProps {
  courseId: string;
}

export const CourseDelete: FC<CourseDeleteProps> = ({ courseId }) => {
  const { replace } = useRouter();
  return (
    <Button
      color='destructive'
      className='w-full'
      onClick={() => CourseDeleteHandler(courseId, () => replace('/'))}
    >
      <Icon type='delete' className='shrink-0 text-secondary-foreground' />
      <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Удалить</span>
    </Button>
  );
};
