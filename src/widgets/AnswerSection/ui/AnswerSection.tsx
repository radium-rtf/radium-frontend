'use client';

import { AnswerSectionResponseDto } from '@/entities/CourseSection';
import { CourseEditContext } from '@/features/CourseEditContext';
import { useSession } from 'next-auth/react';
import { FC, useContext } from 'react';
import { AnswerSectionDisplay } from './AnswerSectionDisplay';
import { AnswerSectionEdit } from './AnswerSectionEdit';

type AnswerSectionProps = {
  sectionData: AnswerSectionResponseDto;
};

export const AnswerSection: FC<AnswerSectionProps> = ({ sectionData }) => {
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);

  if (isEditAllowed && isEditMode) {
    return <AnswerSectionEdit sectionData={sectionData} />;
  }
  return <AnswerSectionDisplay sectionData={sectionData} />;
};
