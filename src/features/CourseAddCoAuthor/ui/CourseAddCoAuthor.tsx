'use client';
import { FC } from 'react';
import { Input, cn } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddCourseCoAuthorMutation } from '@/entities/Course';
import { authorsSchema, authorsSchemaType } from '../model/authorsSchema';

interface CourseAddCoAuthorProps {
  courseId: string;
}

export const CourseAddCoAuthor: FC<CourseAddCoAuthorProps> = ({ courseId }) => {
  const [addCoAuthor] = useAddCourseCoAuthorMutation();

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { isValid, isSubmitted, isSubmitSuccessful },
  } = useForm<authorsSchemaType>({
    resolver: zodResolver(authorsSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmitHandler: SubmitHandler<authorsSchemaType> = async ({ email }) => {
    await addCoAuthor({ courseId, email })
      .unwrap()
      .then(() => reset())
      .catch(() => setError('email', { message: 'Пользователь не существует' }));
  };

  return (
    <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit(onSubmitHandler)}>
      <span className='font-NTSomic leading-tight'>Добавить автора</span>
      <Input
        icon='password'
        className={cn(
          isSubmitSuccessful && '[&:has(:focus)]:border-accent-secondary-400',
          isSubmitted && !isValid && '[&:has(:focus)]:border-red-500'
        )}
        placeholder='Почта'
        {...register('email')}
      />
    </form>
  );
};
