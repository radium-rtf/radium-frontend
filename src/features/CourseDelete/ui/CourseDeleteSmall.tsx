'use client';
import { Button, Icon } from '@/shared';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useDeleteCourseMutation } from '@/entities/Course';

interface CourseDeleteSmallProps {
  courseId: string;
}

export const CourseDeleteSmall: FC<CourseDeleteSmallProps> = ({ courseId }) => {
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
    <Button variant='destructive' onClick={onClickHandler} className='z-10'>
      <Icon type='delete' className='shrink-0 text-inherit' />
    </Button>
  );
};
