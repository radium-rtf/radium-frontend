'use client';
import { Button, Icon } from '@/shared';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useDeleteCourseMutation } from '@/entities/Course';

interface CourseDeleteProps {
  courseId: string;
}

export const CourseDelete: FC<CourseDeleteProps> = ({ courseId }) => {
  const { replace } = useRouter();
  const [deleteCourse] = useDeleteCourseMutation();

  const onClickHandler = () => {
    deleteCourse(courseId)
      .unwrap()
      .then(() => {
        replace('/');
      });
  };

  return (
    <Button color='destructive' className='w-full' onClick={onClickHandler}>
      <Icon type='delete' className='shrink-0 text-secondary-foreground' />
      <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Удалить</span>
    </Button>
  );
};
