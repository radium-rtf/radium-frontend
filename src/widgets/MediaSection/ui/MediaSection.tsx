'use client';
import { MediaSectionResponseDto } from '@/entities/CourseSection';
import { FC, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';

import { MediaSectionDisplay } from './MediaSectionDisplay';
import { MediaSectionEdit } from './MediaSectionEdit';

interface MediaSectionProps {
  sectionData: MediaSectionResponseDto;
}

export const MediaSection: FC<MediaSectionProps> = ({ sectionData }) => {
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);

  if (isEditAllowed && isEditMode) {
    return <MediaSectionEdit sectionData={sectionData} />;
  }

  return <MediaSectionDisplay sectionData={sectionData} />;
};
