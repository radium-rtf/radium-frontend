'use client';
import { CourseJoin } from '@/features/CourseJoin';
import { CourseContinue } from '@/features/CourseContinue';
import { CourseBriefEdit } from './CourseBriedEdit';
import { CourseEditContext } from '@/features/CourseEditContext';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Icon,
  cn,
  getNoun,
} from '@/shared';
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
    <Card>
      {isEditAllowed && isEditing && (
        <CardHeader className='flex-row items-center gap-4 space-y-0'>
          <ChangeCourseLogo logo={courseLogo} courseId={courseId} />
          <h4 className='font-NTSomic text-primary text-base font-medium'>
            {courseName}
          </h4>
        </CardHeader>
      )}
      <CardContent className={cn((!isEditAllowed || !isEditing) && 'pt-6')}>
        <CardDescription>{shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <Icon type='courses' />
        <span className='flex-grow text-[0.8125rem]'>
          {modulesCount} {getNoun(modulesCount, 'тема', 'темы', 'тем')}
        </span>
        {(!isEditing || !isEditMode) && (
          <>
            {!isAssigned && <CourseJoin courseId={courseId} />}
            {isAssigned && <CourseContinue courseId={courseId} />}
          </>
        )}
        {isEditAllowed && isEditing && (
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            <Icon className='mr-4 text-inherit' type='edit' />
            <span>Редактировать</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
