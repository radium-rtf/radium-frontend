'use client';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextArea,
} from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CourseInfoEditSchema } from '../model/CourseInfoEditSchema';
import { usePublishCourseMutation, useUpdateCourseBriefMutation } from '@/entities/Course';
import { z } from 'zod';
import { CourseDelete } from '@/features/CourseDelete';

type CourseInfoEditProps = {
  courseId: string;
  name: string;
  shortDescription: string;
  slug: string;
  isPublished: boolean;
  isAuthor: boolean;
};

export const CourseInfoEdit: FC<CourseInfoEditProps> = ({
  courseId,
  name,
  shortDescription,
  slug,
  isPublished,
  isAuthor,
}) => {
  const [updateCourseInfo] = useUpdateCourseBriefMutation();
  const [publishCourse] = usePublishCourseMutation();

  const form = useForm<z.infer<typeof CourseInfoEditSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(CourseInfoEditSchema),
    defaultValues: {
      name,
      shortDescription,
      slug,
      isPublished: isPublished ? 'on' : 'off',
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  const submitHandler: SubmitHandler<z.infer<typeof CourseInfoEditSchema>> = async ({
    name,
    slug,
    isPublished: newIsPublished,
    shortDescription,
  }) => {
    const response = await updateCourseInfo({ courseId, name, shortDescription, slug });
    if (!('data' in response)) {
      form.setError('root', { message: 'Не удалось обновить данные' });
    }

    if (isAuthor && isPublished !== (newIsPublished === 'on')) {
      const publishResponse = await publishCourse(courseId);
      if (!('data' in publishResponse)) {
        form.setError('root', { message: 'Не удалось опубликовать курс' });
      }
    }
  };

  return (
    <Card>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <CardHeader>
          <CardTitle>Информация</CardTitle>
        </CardHeader>
        <CardContent>
          <Input icon='label' placeholder='Название' {...form.register('name')} />
        </CardContent>
        <CardContent>
          <TextArea
            className='min-h-[8rem] w-full resize-y'
            placeholder='Описание'
            {...form.register('shortDescription')}
          />
        </CardContent>
        <CardContent>
          <div className='mx-6 h-[1px] bg-whiteMedium' />
        </CardContent>
        {isAuthor && (
          <CardContent>
            <Controller
              control={form.control}
              name='isPublished'
              render={({ field: { value, onChange, disabled } }) => (
                <Select disabled={disabled} onValueChange={onChange} value={value}>
                  <SelectTrigger icon='alert' placeholder='Hello'>
                    <SelectValue className='bg-black' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'off'}>Скрыт для всех</SelectItem>
                    <SelectItem value={'on'}>Доступен для всех</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </CardContent>
        )}
        <CardContent>
          <Input icon='link' placeholder='Адрес' {...form.register('slug')} />
        </CardContent>
        <CardFooter className='justify-end'>
          <CourseDelete courseId={courseId} />
          <div className='grow' />
          <Button
            type='submit'
            disabled={isSubmitting}
            variant={Object.values(errors).length ? 'destructive' : 'outline'}
            size='wide'
          >
            <Icon className='text-inherit' type={isSubmitting ? 'loading' : 'save'} />
            <span>
              {isSubmitting
                ? 'Сохраняем...'
                : errors.root?.message ||
                  errors.name?.message ||
                  errors.shortDescription?.message ||
                  errors.slug?.message ||
                  'Сохранить'}
            </span>
            <Icon className='text-inherit' type='blank' />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
