'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { FC, useContext } from 'react';

interface CourseNameProps {
  courseName: string;
  isEditAllowed: boolean;
}

export const CourseName: FC<CourseNameProps> = ({
  courseName,
  isEditAllowed,
}) => {
  const { isEditing } = useContext(CourseEditContext);

  if (isEditAllowed && isEditing) {
    return null;
  }
  return (
    <h1 className='mx-4 break-all font-mono text-5xl font-bold leading-[normal] text-accent-primary-200 lg:col-span-3 2xl:col-span-4'>
      {courseName}
    </h1>
  );
};