'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateCourseBriefMutation } from '@/entities/Course';
import { Button, Card, Icon, Input, TextArea, cn } from '@/shared';

type Inputs = {
  name: string;
  shortDescription: string;
};

interface IProps {
  courseName: string;
  courseShortDescription: string;
  courseId: string;
  onSave: () => void;
}

export const CourseBriefEdit: FC<IProps> = ({
  courseName,
  courseShortDescription,
  courseId,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [updateBrief] = useUpdateCourseBriefMutation();
  const router = useRouter();

  const submitHandler: SubmitHandler<Inputs> = async ({
    name,
    shortDescription,
  }) => {
    return updateBrief({ courseId, name, shortDescription })
      .unwrap()
      .then((data) => {
        onSave();
        data.name === courseName
          ? router.refresh()
          : router.push(`/courses/${data.slug}`, { scroll: false });
      });
  };

  return (
    <Card className='flex flex-col gap-4 rounded-lg' asChild>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Input
          defaultValue={courseName}
          placeholder='Введите название текста'
          iconType='courses'
          className={errors.name && 'outline outline-red-600'}
          {...register('name', { required: true })}
        />
        <TextArea
          defaultValue={courseShortDescription}
          className={cn(
            'min-h-[12rem] resize-y',
            errors.shortDescription && 'outline outline-red-600'
          )}
          {...register('shortDescription', { required: true, maxLength: 500 })}
        />
        <Button className='w-64 self-end'>
          <Icon type='submit' className='shrink-0' />
          <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Готово</span>
        </Button>
      </form>
    </Card>
  );
};
