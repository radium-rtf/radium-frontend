'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Icon } from '@/shared';
import { usePublishCourseMutation } from '@/entities/Course';

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
  const [togglePublish] = usePublishCourseMutation();

  const onClickHandler = () => {
    togglePublish(courseId).unwrap().then(refresh);
  };

  return (
    <Button
      disabled={!isPublishable && !isPublished}
      variant={isPublished ? 'destructive' : 'default'}
      className='w-full justify-start'
      onClick={onClickHandler}
    >
      <Icon type='share' className='shrink-0 text-inherit' />
      <span className='ml-[calc(50%-18px)] shrink-0 -translate-x-1/2'>
        {isPublished ? 'Снять с публикации' : 'Опубликовать'}
      </span>
    </Button>
  );
};
