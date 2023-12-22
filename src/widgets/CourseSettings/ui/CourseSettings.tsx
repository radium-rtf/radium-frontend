'use client';
import { CourseDelete } from '@/features/CourseDelete';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CoursePublishToggle } from '@/features/CoursePublishToggle';
import { Card, Checkbox } from '@/shared';
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
      <h1 className='font-mono text-xl font-bold leading-[normal] text-primary-default'>
        {isPublished && 'Опубликован'}
        {!isPublished &&
          (!hasName ||
            !hasShortDescription ||
            !hasDescription ||
            !hasLogo ||
            !hasBanner) &&
          'Не готов к публикации'}
        {!isPublished &&
          hasName &&
          hasShortDescription &&
          hasDescription &&
          hasLogo &&
          hasBanner &&
          'Готов к публикации'}
      </h1>
      {isEditing && (
        <div>
          <Checkbox
            labelClassName='pointer-events-none py-2'
            checked={hasName}
            onChange={() => {}}
          >
            Придумать название курса
          </Checkbox>
          <Checkbox
            labelClassName='pointer-events-none py-2'
            checked={hasShortDescription}
            onChange={() => {}}
          >
            Придумать описание курса
          </Checkbox>
          <Checkbox
            labelClassName='pointer-events-none py-2'
            checked={hasLogo}
            onChange={() => {}}
          >
            Загрузить лого курса
          </Checkbox>
          <Checkbox
            labelClassName='pointer-events-none py-2'
            checked={hasBanner}
            onChange={() => {}}
          >
            Загрузить обложку курса
          </Checkbox>
          <Checkbox
            labelClassName='pointer-events-none py-2'
            checked={hasDescription}
            onChange={() => {}}
          >
            Заполнить секцию О курсе
          </Checkbox>
        </div>
      )}
      {isEditAllowed && (
        <CoursePublishToggle
          isPublishable={
            hasName &&
            hasShortDescription &&
            hasDescription &&
            hasBanner &&
            hasLogo
          }
          courseId={courseId}
          isPublished={isPublished}
        />
      )}
      {isEditing && isEditAllowed && <CourseDelete courseId={courseId} />}
    </Card>
  );
};
