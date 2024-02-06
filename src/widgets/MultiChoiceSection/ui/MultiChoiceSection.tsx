'use client';
import { useSession } from 'next-auth/react';
import { FC, useContext } from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { MultiChoiceSectionResponseDto } from '@/entities/CourseSection';
import { MultiChoiceSectionEdit } from './MultiChoiceSectionEdit';
import { MultiChoiceSectionDisplay } from './MultiChoiceSectionDisplay';

interface MultiChoiceSectionProps {
  sectionData: MultiChoiceSectionResponseDto;
}

export const MultiChoiceSection: FC<MultiChoiceSectionProps> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;

  if (isEditAllowed && isEditMode) {
    return <MultiChoiceSectionEdit sectionData={sectionData} />;
  }

  return <MultiChoiceSectionDisplay sectionData={sectionData} />;
};
