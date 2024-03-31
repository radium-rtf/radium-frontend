'use client';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Icon } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateCourseDescriptionMutation } from '@/entities/Course';
import { CourseDescriptionEditSchema } from '../model/CourseDescriptionEditSchema';
import { z } from 'zod';

interface CourseDescriptionEditProps {
  courseId: string;
  description: string;
}

export const CourseDescriptionEdit: FC<CourseDescriptionEditProps> = ({
  courseId,
  description,
}) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof CourseDescriptionEditSchema>>({
    resolver: zodResolver(CourseDescriptionEditSchema),
    defaultValues: {
      description: description,
    },
  });

  const [updateDescription] = useUpdateCourseDescriptionMutation();
  const submitHandler: SubmitHandler<z.infer<typeof CourseDescriptionEditSchema>> = async ({
    description,
  }) => {
    const response = await updateDescription({ courseId, description });
    if (!('data' in response)) {
      setError('root', { message: 'Не удалось обновить описание' });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardHeader className='flex-row items-center gap-4 space-y-0'>
          <Icon type='question' className='text-primary' />
          <CardTitle className='text-[1rem]'>О курсе</CardTitle>
        </CardHeader>
        <CardContent>
          <Controller
            control={control}
            name='description'
            render={({ field: { value, onChange } }) => (
              <MarkdownEditor markdown={value} onChange={onChange} />
            )}
          />
        </CardContent>
        <CardFooter className='justify-end'>
          <Button
            type='submit'
            size='wide'
            variant={Object.values(errors).length ? 'destructive' : 'outline'}
            disabled={isSubmitting}
          >
            <Icon className='shrink-0 text-inherit' type={isSubmitting ? 'loading' : 'save'} />
            <span>
              {(isSubmitting && 'Сохраняем...') ||
                errors.root?.message ||
                errors.description?.message ||
                'Сохранить'}
            </span>
            <Icon type='blank' />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
