'use client';
import { FC, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { PermutationSectionEdit } from './PermutationsSectionEdit';
import { PermutationsSectionDisplay } from './PermutationSectionDisplay';
import { PermutationSectionResponseDto } from '@/entities/CourseSection';

interface PermutationSectionProps {
  sectionData: PermutationSectionResponseDto;
}

export const PermutationsSection: FC<PermutationSectionProps> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;

  if (isEditAllowed && isEditMode) {
    return <PermutationSectionEdit sectionData={sectionData} />;
  }

  return <PermutationsSectionDisplay sectionData={sectionData} />;
};
