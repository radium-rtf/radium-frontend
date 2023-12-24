'use client';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateCourseBriefMutation } from '@/entities/Course';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  TextArea,
} from '@/shared';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeCourseLogo } from '@/features/ChangeCourseLogo';

interface IProps {
  courseName: string;
  courseShortDescription: string;
  courseId: string;
  courseLogo: string;
}

export const CourseBriefEdit: FC<IProps> = ({
  courseName,
  courseShortDescription,
  courseId,
  courseLogo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { isValid, isSubmitting, errors },
  } = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: courseName,
      shortDescription: courseShortDescription,
    },
  });

  const [updateBrief] = useUpdateCourseBriefMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async ({
    name,
    shortDescription,
  }) => {
    await updateBrief({ courseId, name, shortDescription })
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
          <ChangeCourseLogo logo={courseLogo} courseId={courseId} />
          {!isEditing && (
            <CardTitle className='text-[1rem] leading-[normal]'>
              {courseName}
            </CardTitle>
          )}
          {isEditing && (
            <Input
              className='w-full'
              placeholder='Название курса'
              {...register('name', {
                onChange: () => errors.root && clearErrors('root'),
              })}
            />
          )}
        </CardHeader>
        <CardContent>
          {!isEditing && (
            <CardDescription>{courseShortDescription}</CardDescription>
          )}
          {isEditing && (
            <TextArea
              className='min-h-[4rem] w-full resize-y'
              {...register('shortDescription', {
                onChange: () => errors.root && clearErrors('root'),
              })}
            />
          )}
        </CardContent>
        <CardFooter className='justify-end'>
          {!isEditing && (
            <Button
              type='button'
              className='w-64 shrink-0 justify-start'
              variant='outline'
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
              variant={isValid ? 'outline' : 'destructive'}
              disabled={isSubmitting}
              onClick={() => setIsEditing(true)}
            >
              <Icon
                className='shrink-0 text-inherit'
                type={isSubmitting ? 'loading' : 'submit'}
              />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                {errors.root?.message ||
                  errors.name?.message ||
                  errors.shortDescription?.message ||
                  'Готово'}
              </span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
