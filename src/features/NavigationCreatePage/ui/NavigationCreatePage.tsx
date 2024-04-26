import { ButtonHTMLAttributes, FC, useEffect, useState } from 'react';
import { Icon, Input, cn } from '@/shared';
import { useCreateCoursePageMutation } from '@/entities/CoursePage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPageSchema, createPageSchemaType } from '../model/createPageSchema';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  moduleId: string;
}

export const NavigationCreatePage: FC<IProps> = ({ className, moduleId, ...props }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [createPage] = useCreateCoursePageMutation();

  const form = useForm<createPageSchemaType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(createPageSchema),
  });

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCreating(false);
      }
    };
    if (isCreating) {
      document.addEventListener('keydown', escapeHandler);
    }
    return () => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, [isCreating]);

  const submitHandler: SubmitHandler<createPageSchemaType> = async ({ name }) => {
    await createPage({ name, moduleId });
    setIsCreating(false);
    form.reset();
  };

  if (isCreating) {
    return (
      <form onSubmit={form.handleSubmit(submitHandler)} className='px-2 py-1.5'>
        <Input
          disabled={form.formState.isSubmitting}
          placeholder={form.formState.errors.name?.message || 'Страница'}
          actionIcon='success'
          onActionClick={() => form.handleSubmit(submitHandler)()}
          {...form.register('name')}
        />
      </form>
    );
  }

  return (
    <button
      {...props}
      className={cn(
        'flex w-full items-center gap-4 rounded-[0.5rem] border border-transparent px-6 py-2 outline-none outline-1 -outline-offset-1 transition-colors hover:border-white/10 hover:bg-white/5 focus-visible:outline-white',
        className
      )}
      onClick={() => {
        setIsCreating((prev) => !prev);
      }}
    >
      <Icon type='add' className='text-primary' />
      <span className='text-[0.8125rem] leading-tight'>Добавить страницу</span>
    </button>
  );
};
