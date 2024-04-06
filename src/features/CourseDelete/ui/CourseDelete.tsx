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
        replace('/', { scroll: false });
      });
  };

  return (
    <Button type='button' variant='destructive' onClick={onClickHandler}>
      <Icon type='delete' className='mr-4 shrink-0 text-inherit' />
      <span>Удалить курс</span>
    </Button>
  );
};
