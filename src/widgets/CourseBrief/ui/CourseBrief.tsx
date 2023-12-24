'use client';
import { FC, useContext } from 'react';
import { CourseBriefDisplay } from './CourseBriefDipslay';
import { CourseBriefEdit } from './CourseBriefEdit';
import { CourseEditContext } from '@/features/CourseEditContext';

interface CourseBriefDisplayProps {
  shortDescription: string;
  modulesCount: number;
  courseName: string;
  courseId: string;
  courseLogo: string;
  isEditAllowed: boolean;
  isAssigned: boolean;
}

export const CourseBrief: FC<CourseBriefDisplayProps> = ({
  courseId,
  courseLogo,
  courseName,
  isAssigned,
  isEditAllowed,
  modulesCount,
  shortDescription,
}) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);

  if (isEditAllowed && isEditMode) {
    return (
      <CourseBriefEdit
        courseId={courseId}
        courseName={courseName}
        courseShortDescription={shortDescription}
        courseLogo={courseLogo}
      />
    );
  }

  return (
    <CourseBriefDisplay
      courseId={courseId}
      modulesCount={modulesCount}
      shortDescription={shortDescription}
      isAssigned={isAssigned}
    />
  );
};
