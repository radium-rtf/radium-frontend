'use client';

import { FC, useContext } from 'react';
import { MappingSectionDisplay } from './MappingSectionDisplay';
import { MappingSectionResponseDto } from '@/entities/CourseSection';
import { CourseEditContext } from '@/features/CourseEditContext';
import { useSession } from 'next-auth/react';
import { MappingSectionEdit } from './MappingSectionEdit';

interface MappingSection {
  sectionData: MappingSectionResponseDto;
}

export const MappingSection: FC<MappingSection> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;

  if (isEditAllowed && isEditMode) {
    return <MappingSectionEdit sectionData={sectionData} />;
  }

  return <MappingSectionDisplay sectionData={sectionData} />;
};
