'use client';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
} from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { FC, useEffect, useState } from 'react';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateCourseDescriptionMutation } from '@/entities/Course';

interface CourseDescriptionEditProps {
  courseId: string;
  description: string;
}

export const CourseDescriptionEdit: FC<CourseDescriptionEditProps> = ({
  courseId,
  description,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      description: description,
    },
  });

  const [updateDescription] = useUpdateCourseDescriptionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async ({
    description,
  }) => {
    await updateDescription({ courseId, description: description })
      .unwrap()
      .then(() => setIsEditing(false))
      .catch(() => setError('root', { message: 'Ошибка!' }));
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.body.addEventListener('keydown', listener);
    }
    return () => {
      document.body.removeEventListener('keydown', listener);
    };
  }, [isEditing]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardHeader className='flex-row items-center gap-4 space-y-0'>
          <Icon type='question' className='text-primary' />
          <CardTitle className='text-base'>О курсе</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing && <MarkdownDisplay markdown={description} />}
          {isEditing && (
            <Controller
              control={control}
              name='description'
              render={({ field: { value, onChange } }) => (
                <MarkdownEditor markdown={value} onChange={onChange} />
              )}
            />
          )}
        </CardContent>
        <CardFooter className='justify-end'>
          {!isEditing && (
            <Button
              className='w-64 justify-start'
              variant='outline'
              type='button'
              onClick={() => setIsEditing(true)}
            >
              <Icon type='edit' />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                Редактировать
              </span>
            </Button>
          )}
          {isEditing && (
            <Button
              type='submit'
              className='w-64 shrink-0 justify-start'
              variant={
                !isValid && (errors.description || errors.root)
                  ? 'destructive'
                  : 'outline'
              }
              disabled={isSubmitting}
              onClick={() => setIsEditing(true)}
            >
              <Icon
                className='shrink-0 text-inherit'
                type={isSubmitting ? 'loading' : 'submit'}
              />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                {errors.root?.message ||
                  errors.description?.message ||
                  'Готово'}
              </span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
