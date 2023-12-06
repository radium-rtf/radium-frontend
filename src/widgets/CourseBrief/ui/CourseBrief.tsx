'use client';
import { CourseJoin } from '@/features/CourseJoin';
import { CourseContinue } from '@/features/CourseContinue';
import { CourseBriefEdit } from './CourseBriedEdit';
import { CourseEditContext } from '@/features/CourseEditContext';
import { Button, Card, Icon } from '@/shared';
import { FC, useContext, useState } from 'react';
import { ChangeCourseLogo } from '@/features/ChangeCourseLogo';

interface IProps {
  shortDescription: string;
  modulesCount: number;
  courseName: string;
  courseId: string;
  courseLogo: string;
  isEditAllowed: boolean;
  isAssigned: boolean;
}

export const CourseBrief: FC<IProps> = ({
  shortDescription,
  modulesCount,
  courseName,
  courseLogo,
  courseId,
  isEditAllowed,
  isAssigned,
}) => {
  const { isEditing } = useContext(CourseEditContext);
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditAllowed && isEditing && isEditMode) {
    return (
      <CourseBriefEdit
        courseName={courseName}
        courseShortDescription={shortDescription}
        courseId={courseId}
        onSave={() => setIsEditMode(false)}
      />
    );
  }

  return (
    <Card className='flex flex-col gap-4'>
      {isEditAllowed && isEditing && (
        <div className='flex items-center gap-4'>
          <ChangeCourseLogo logo={courseLogo} courseId={courseId} />
          <h1>{courseName}</h1>
        </div>
      )}
      <p className='text-[0.8125rem] leading-normal'>{shortDescription}</p>
      <div className='flex items-center gap-2'>
        <Icon type='courses' />
        <span className='flex-grow text-[0.8125rem]'>{modulesCount} темы</span>
        {!isEditing && !isEditMode && (
          <>
            {!isAssigned && <CourseJoin courseId={courseId} />}
            {isAssigned && <CourseContinue courseId={courseId} />}
          </>
        )}
        {isEditAllowed && isEditing && (
          <Button
            type='button'
            color='outlined'
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            <Icon type='edit' />
            <span>Редактировать</span>
          </Button>
        )}
      </div>
    </Card>
  );
};
