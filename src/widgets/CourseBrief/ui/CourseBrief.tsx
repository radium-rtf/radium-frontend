'use client';
import React, { FC, useContext, useState } from 'react';
import { Button, Card, Icon } from '@/shared';
import { useParams } from 'next/navigation';
import { CourseBriefEdit } from './CourseBriedEdit';
import { CourseEditContext } from '@/features/CourseEditContext';
import Link from 'next/link';

interface IProps {
  shortDescription: string;
  modulesCount: number;
  courseName: string;
  courseId: string;
  isEditAllowed: boolean;
}

export const CourseBrief: FC<IProps> = ({
  shortDescription,
  modulesCount,
  courseName,
  courseId,
  isEditAllowed,
}) => {
  const params = useParams();
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
      <p className='text-[0.8125rem] leading-normal'>{shortDescription}</p>
      <div className='flex items-center gap-2'>
        <Icon type='courses' />
        <span className='flex-grow text-[0.8125rem]'>{modulesCount} темы</span>
        {!isEditing && !isEditMode && (
          <Button
            asChild
            className='flex items-center gap-2'
            type='button'
            color='accent'
          >
            <Link href={`/courses/${params.slug}/study`}>
              <Icon type='start' className='text-grey-800' />
              <p>Начать</p>
            </Link>
          </Button>
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