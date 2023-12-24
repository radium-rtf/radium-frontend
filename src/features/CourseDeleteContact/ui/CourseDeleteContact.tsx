'use client';
import { FC } from 'react';
import { Icon } from '@/shared';
import { useDeleteCourseContactMutation } from '@/entities/Course';

interface CourseDeleteContactProps {
  contactId: string;
  courseId: string;
}

export const CourseDeleteContact: FC<CourseDeleteContactProps> = ({
  contactId,
  courseId,
}) => {
  const [deleteContact] = useDeleteCourseContactMutation();

  const onClickHandler = () => {
    deleteContact({ contactId, courseId });
  };

  return (
    <button onClick={onClickHandler} type='button' className='relative'>
      <Icon type='remove' className='h-3 text-primary' />
    </button>
  );
};
