'use client';
import { CourseEditContext } from '@/features/CourseEditContext';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from '@/shared';
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
      <CardHeader className='flex-row items-center gap-4 space-y-0'>
        <Icon type='question' className='text-primary' />
        <CardTitle className='text-base'>О курсе</CardTitle>
      </CardHeader>

      <CardContent>
        {(!isEditMode || !isEditing) && (
          <MarkdownDisplay markdown={description} />
        )}
      </CardContent>

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
