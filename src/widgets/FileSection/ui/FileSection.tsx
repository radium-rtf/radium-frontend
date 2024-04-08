'use client';
import { FileSectionResponseDto } from '@/entities/CourseSection';
import { FC, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { FileSectionEdit } from './FileSectionEdit';
import { FileSectionDisplay } from './FileSectionDisplay';

interface FileSectionProps {
  sectionData: FileSectionResponseDto;
}

export const FileSection: FC<FileSectionProps> = ({ sectionData }) => {
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  if (isEditAllowed && isEditMode) {
    return <FileSectionEdit sectionData={sectionData} />;
  }

  return <FileSectionDisplay sectionData={sectionData} />;
};
