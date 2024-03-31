import { useAddCourseContactMutation } from '@/entities/Course';
import {
  Button,
  Icon,
  Input,
  ListContent,
  ListIcon,
  ListItem,
  ListTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addContactSchema, addContactSchemaType } from '../model/addContactSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface CourseAddContactProps {
  courseId: string;
}

export const CourseAddContact: FC<CourseAddContactProps> = ({ courseId }) => {
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
      .then(() => reset())
      .catch(() => setError('link', { message: 'Ошибка' }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ListItem className='hover:border-outlineGeneral hover:bg-whiteLight'>
          <ListIcon icon='add' />
          <ListContent>
            <ListTitle className='text-start'>Добавить контакт</ListTitle>
          </ListContent>
        </ListItem>
      </PopoverTrigger>
      <PopoverContent className='w-80' side='bottom' align='start' sideOffset={24 + 32}>
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
                errors.link?.message ||
                errors.name?.message ||
                'Сохранить'}
            </span>
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
