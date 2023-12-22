import { useAddCourseContactMutation } from '@/entities/Course';
import { Button, Card, Icon, Input } from '@/shared';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  addContactSchema,
  addContactSchemaType,
} from '../model/addContactSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface CourseAddContactProps {
  courseId: string;
}

export const CourseAddContact: FC<CourseAddContactProps> = ({ courseId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addContact] = useAddCourseContactMutation();

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isValid, isSubmitted },
  } = useForm<addContactSchemaType>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      link: '',
      name: '',
    },
  });

  const onSubmitHandler: SubmitHandler<addContactSchemaType> = async (data) => {
    await addContact({
      courseId: courseId,
      ...data,
    })
      .unwrap()
      .then(() => setIsFormOpen(false))
      .then(() => reset())
      .catch(() => setError('link', { message: 'Ошибка' }));
  };

  useEffect(() => {
    if (!isFormOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest('.absolute')) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [isFormOpen]);

  return (
    <div className='relative -mx-6 flex w-[calc(100%+3rem)]'>
      <button
        onClick={() => setIsFormOpen(true)}
        className='flex w-full items-center gap-4 px-6 py-2'
      >
        <Icon type='add' className='text-primary-default' />
        <span className='font-mono text-[0.8125rem] leading-tight'>
          Добавить контакт
        </span>
      </button>
      {isFormOpen && (
        <Card
          className='absolute -bottom-6 -left-[calc(100%+2rem)] w-full bg-background-overlay'
          asChild
        >
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Input iconType='link' placeholder='Ссылка' {...register('link')} />
            <Input
              iconType='link'
              placeholder='Название'
              {...register('name')}
            />
            <Button
              type='submit'
              color='accent'
              disabled={isSubmitted && !isValid}
            >
              <Icon
                type='save'
                className='shrink-0 text-secondary-foreground'
              />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                {(errors.link && errors.link.message) ||
                  (errors.name && errors.name.message) ||
                  'Сохранить'}
              </span>
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};
