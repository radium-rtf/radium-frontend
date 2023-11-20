'use client';
import { FC, ReactNode, useState } from 'react';
import { CourseEditContext } from '../lib/CourseEditContext';

interface CourseEditContextWrapperProps {
  children: ReactNode;
}

export const CourseEditContextWrapper: FC<CourseEditContextWrapperProps> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <CourseEditContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </CourseEditContext.Provider>
  );
};
