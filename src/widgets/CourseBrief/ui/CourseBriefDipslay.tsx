'use client';
import { FC } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, Icon, getNoun } from '@/shared';
import { CourseJoin } from '@/features/CourseJoin';
import { CourseContinue } from '@/features/CourseContinue';

interface CourseBriefDisplayProps {
  shortDescription: string;
  modulesCount: number;
  courseId: string;
  isAssigned: boolean;
}

export const CourseBriefDisplay: FC<CourseBriefDisplayProps> = ({
  shortDescription,
  modulesCount,
  courseId,
  isAssigned,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{shortDescription}</CardDescription>
      </CardHeader>
      <CardFooter className='flex items-center gap-2'>
        <Icon type='courses' />
        <span className='flex-grow text-[0.8125rem]'>
          {modulesCount} {getNoun(modulesCount, 'тема', 'темы', 'тем')}
        </span>
        {!isAssigned && <CourseJoin courseId={courseId} />}
        {isAssigned && <CourseContinue courseId={courseId} />}
      </CardFooter>
    </Card>
  );
};
