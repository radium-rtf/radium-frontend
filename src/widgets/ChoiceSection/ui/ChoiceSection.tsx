'use client';
import { useSession } from 'next-auth/react';
import { FC, useContext } from 'react';
import { ChoiceSectionEdit } from './ChoiceSectionEdit';
import { CourseEditContext } from '@/features/CourseEditContext';
import { ChoiceSectionDisplay } from './ChoiceSectionDisplay';
import { ChoiceSectionResponseDto } from '@/entities/CourseSection';

interface ChoiceSectionProps {
  sectionData: ChoiceSectionResponseDto;
}

export const ChoiceSection: FC<ChoiceSectionProps> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;

  if (isEditAllowed && isEditMode) {
    return <ChoiceSectionEdit sectionData={sectionData} />;
  }

  return <ChoiceSectionDisplay sectionData={sectionData} />;
};
