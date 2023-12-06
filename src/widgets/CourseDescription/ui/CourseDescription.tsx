'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import { Button, Card, Icon } from '@/shared';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { FC, useContext, useState } from 'react';
import { CourseDescriptionEdit } from './CourseDescriptionEdit';

interface CourseDescriptionProps {
  courseId: string;
  description: string;
  isEditAllowed: boolean;
}

export const CourseDescription: FC<CourseDescriptionProps> = ({
  courseId,
  description,
  isEditAllowed,
}) => {
  const { isEditing } = useContext(CourseEditContext);
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditAllowed && isEditing && isEditMode) {
    return (
      <CourseDescriptionEdit
        courseId={courseId}
        description={description}
        onSave={() => setIsEditMode(false)}
      />
    );
  }

  return (
    <Card className='gap-6'>
      <h1 className='font-mono text-[2rem] font-bold leading-[normal] text-primary-default after:left-12'>
        О курсе
      </h1>

      {(!isEditMode || !isEditing) && (
        <MarkdownDisplay markdown={description} />
      )}

      {isEditAllowed && isEditing && (
        <Button className='w-64 self-end' onClick={() => setIsEditMode(true)}>
          <Icon type='edit' />
          <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
            Редактировать
          </span>
        </Button>
      )}
    </Card>
  );
};
