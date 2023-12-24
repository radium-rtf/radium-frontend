'use client';
import { FC, useContext } from 'react';
import { TextSectionEdit } from './TextSectionEdit';
import { CourseEditContext } from '@/features/CourseEditContext';
import { TextSectionDisplay } from './TextSectionDisplay';
import { TextSectionResponseDto } from '@/entities/CourseSection';

interface TextSectionProps {
  sectionData: TextSectionResponseDto;
}

export const TextSection: FC<TextSectionProps> = ({ sectionData }) => {
  const { isEditing: isEditMode } = useContext(CourseEditContext);

  if (isEditMode) {
    return <TextSectionEdit sectionData={sectionData} />;
  }

  return <TextSectionDisplay sectionData={sectionData} />;
};
