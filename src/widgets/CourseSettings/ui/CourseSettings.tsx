'use client';
import { CourseDelete } from '@/features/CourseDelete';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CoursePublishToggle } from '@/features/CoursePublishToggle';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Checkbox } from '@/shared';
import { FC, useContext } from 'react';

interface CourseSettingsProps {
  hasName: boolean;
  hasShortDescription: boolean;
  hasDescription: boolean;
  hasLogo: boolean;
  hasBanner: boolean;
  courseId: string;
  isPublished: boolean;
  isEditAllowed: boolean;
}

export const CourseSettings: FC<CourseSettingsProps> = ({
  hasName,
  hasShortDescription,
  hasDescription,
  hasLogo,
  hasBanner,
  courseId,
  isPublished,
  isEditAllowed,
}) => {
  const { isEditing } = useContext(CourseEditContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isPublished && 'Опубликован'}
          {!isPublished &&
            (!hasName || !hasShortDescription || !hasDescription || !hasLogo || !hasBanner) &&
            'Не готов к публикации'}
          {!isPublished &&
            hasName &&
            hasShortDescription &&
            hasDescription &&
            hasLogo &&
            hasBanner &&
            'Готов к публикации'}
        </CardTitle>
      </CardHeader>
      <h1 className='font-NTSomic text-xl font-bold leading-[normal] text-primary'></h1>
      {isEditing && (
        <CardContent>
          <div className='flex items-center gap-4 py-2'>
            <Checkbox id='courseName' checked={hasName} onChange={() => {}} />
            <label htmlFor='courseName' className='text-[0.8125rem] leading-normal'>
              Придумать название курса
            </label>
          </div>
          <div className='flex items-center gap-4 py-2'>
            <Checkbox id='courseName' checked={hasShortDescription} onChange={() => {}} />
            <label htmlFor='courseName' className='text-[0.8125rem] leading-normal'>
              Придумать описание курса
            </label>
          </div>
          <div className='flex items-center gap-4 py-2'>
            <Checkbox id='courseName' checked={hasLogo} onChange={() => {}} />
            <label htmlFor='courseName' className='text-[0.8125rem] leading-normal'>
              Загрузить лого курса
            </label>
          </div>
          <div className='flex items-center gap-4 py-2'>
            <Checkbox id='courseName' checked={hasBanner} onChange={() => {}} />
            <label htmlFor='courseName' className='text-[0.8125rem] leading-normal'>
              Загрузить обложку курса
            </label>
          </div>
          <div className='flex items-center gap-4 py-2'>
            <Checkbox id='courseName' checked={hasDescription} onChange={() => {}} />
            <label htmlFor='courseName' className='text-[0.8125rem] leading-normal'>
              Заполнить секцию О курсе
            </label>
          </div>
        </CardContent>
      )}
      {isEditAllowed && (
        <CardFooter className='flex flex-col gap-4'>
          <CoursePublishToggle
            isPublishable={hasName && hasShortDescription && hasDescription && hasBanner && hasLogo}
            courseId={courseId}
            isPublished={isPublished}
          />
          {isEditing && <CourseDelete courseId={courseId} />}
        </CardFooter>
      )}
    </Card>
  );
};
