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
    formState: { isValid, isSubmitted, isSubmitSuccessful },
  } = useForm<authorsSchemaType>({
    resolver: zodResolver(authorsSchema),
    defaultValues: {
      courseId: courseId,
      email: '',
    },
  });

  const onSubmitHandler: SubmitHandler<authorsSchemaType> = async (data) => {
    await addCoAuthor(data)
      .unwrap()
      .catch(() => setError('email', { message: 'Пользователь не существует' }));
  };

  return (
    <form className='mx-2 my-1.5' onSubmit={handleSubmit(onSubmitHandler)}>
      <Input
        icon='password'
        className={cn(
          isSubmitSuccessful && '[&:has(:focus)]:border-accent-secondary-400',
          isSubmitted && !isValid && '[&:has(:focus)]:border-red-500'
        )}
        placeholder='Имя пользователя или почта'
        {...register('email')}
      />
    </form>
  );
};
