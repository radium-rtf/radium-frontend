'use client';
import { Button, Icon } from '@/shared';
import { FC } from 'react';
import { coursePublishHandler } from '../lib/coursePublishHandler';
import { useRouter } from 'next/navigation';

interface CoursePublishToggleProps {
  isPublished: boolean;
  isPublishable: boolean;
  courseId: string;
}

export const CoursePublishToggle: FC<CoursePublishToggleProps> = ({
  courseId,
  isPublished,
  isPublishable,
}) => {
  const { refresh } = useRouter();

  return (
    <Button
      disabled={!isPublishable && !isPublished}
      color='accent'
      className='w-full'
      onClick={() => coursePublishHandler(courseId, refresh)}
    >
      <Icon type='share' className='shrink-0 text-secondary-foreground' />
      <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
        {isPublished ? 'Снять с публикации' : 'Опубликовать'}
      </span>
    </Button>
  );
};
