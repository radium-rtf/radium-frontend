import { useAddCourseContactMutation } from '@/entities/Course';
import { Button, Icon, Input, Popover, PopoverContent, PopoverTrigger } from '@/shared';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addContactSchema, addContactSchemaType } from '../model/addContactSchema';
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
    formState: { errors, isValid, isSubmitted, isSubmitting },
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
    <Popover>
      <PopoverTrigger asChild>
        <button
          onClick={() => setIsFormOpen(true)}
          className='flex w-full items-center gap-4 px-6 py-2'
        >
          <Icon type='add' className='text-primary' />
          <span className='font-NTSomic text-[0.8125rem] leading-tight'>Добавить контакт</span>
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-80' side='left' align='end' alignOffset={-16} sideOffset={32}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-4'>
          <Input icon='link' placeholder='Ссылка' {...register('link')} />
          <Input icon='text' placeholder='Название' {...register('name')} />
          <Button
            type='submit'
            className='justify-start'
            disabled={(isSubmitted && !isValid) || isSubmitting}
          >
            <Icon type='save' className='shrink-0 text-inherit' />
            <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
              {(isSubmitting && 'Загружаем...') ||
                (errors.link && errors.link.message) ||
                (errors.name && errors.name.message) ||
                'Сохранить'}
            </span>
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
