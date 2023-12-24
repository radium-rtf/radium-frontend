'use client';
import { FC, useContext } from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseDescriptionEdit } from './CourseDescriptionEdit';
import { CourseDescriptionDisplay } from './CourseDescriptionDisplay';

interface CourseDescriptionProps {
  courseId: string;
  description: string;
  isEditAllowed: boolean;
}
export const CourseDescription: FC<CourseDescriptionProps> = ({
  courseId,
  description,
  isEditAllowed,
}) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);

  if (isEditAllowed && isEditMode) {
    return (
      <CourseDescriptionEdit courseId={courseId} description={description} />
    );
  }

  return <CourseDescriptionDisplay description={description} />;
};
