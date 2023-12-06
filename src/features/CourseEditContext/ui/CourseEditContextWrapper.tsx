'use client';
import { FC, ReactNode, useState } from 'react';
import { CourseEditContext } from '../lib/CourseEditContext';

interface CourseEditContextWrapperProps {
  children: ReactNode;
  isEditMode?: boolean;
}

export const CourseEditContextWrapper: FC<CourseEditContextWrapperProps> = ({
  children,
  isEditMode,
}) => {
  const [isEditing, setIsEditing] = useState(isEditMode || false);

  return (
    <CourseEditContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </CourseEditContext.Provider>
  );
};
