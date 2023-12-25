'use client';
import { useSession } from 'next-auth/react';
import { FC, useContext } from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { ShortAnswerSectionEdit } from './ShortAnswerSectionEdit';
import { ShortAnswerSectionDisplay } from './ShortAnswerSectionDisplay';
import { ShortAnswerSectionResponseDto } from '@/entities/CourseSection';

interface ShortAnswerSectionProps {
  sectionData: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSection: FC<ShortAnswerSectionProps> = ({
  sectionData,
}) => {
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);

  if (isEditAllowed && isEditMode) {
    return <ShortAnswerSectionEdit sectionData={sectionData} />;
  }

  return <ShortAnswerSectionDisplay sectionData={sectionData} />;
};
