'use client';
import { Icon, Input, cn } from '@/shared';
import { FC, FormEvent, HTMLAttributes, useEffect, useState } from 'react';
import {
  useDeleteModuleMutation,
  useUpdateModuleNameMutation,
} from '../api/moduleApi';
import { useSearchParams } from 'next/navigation';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
  name: string;
  moduleId: string;
  isCurrentModule?: boolean;
}

export const NavigationModuleTitle: FC<IProps> = ({
  className,
  name,
  moduleId,
  isCurrentModule = false,
  ...props
}) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing') === 'true';
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [deleteModule] = useDeleteModuleMutation();
  const [updateName] = useUpdateModuleNameMutation();

  // Сброс стейта при отключении редактирования
  useEffect(() => {
    if (searchParams.get('isEditing') !== 'true' && isNameEditing) {
      setIsNameEditing(false);
    }
  }, [isNameEditing, searchParams]);

  // Создание обработчика Escape при редактировании названия
  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('test 2 ');
        setIsNameEditing(false);
      }
    };
    if (isNameEditing) {
      document.addEventListener('keydown', escapeHandler);
    }
    return () => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, [isNameEditing]);

  // Хендлер изменения имени модуля
  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    updateName({ id: moduleId, name: fd.get('newName') as string });
    setIsNameEditing(false);
  };

  // Хендлер удаления модуля
  const deleteHandler = () => {
    deleteModule({ id: moduleId });
  };

  if (isNameEditing && isEditing) {
    return (
      <form onSubmit={(e) => formSubmitHandler(e)} className='px-2 py-1.5'>
        <Input name='newName' defaultValue={name} />
      </form>
    );
  }

  return (
    <div
      className={cn('group flex items-center gap-4 px-6 py-4', className)}
      {...props}
    >
      <h2
        className={cn(
          'flex-grow break-all text-xl font-bold text-accent-primary-200',
          isCurrentModule && 'text-accent-secondary-300'
        )}
      >
        {name}
      </h2>
      {isEditing && (
        <>
          <button className='p-0.5' type='button' onClick={deleteHandler}>
            <Icon
              type='delete'
              className='flex-shrink-0 text-destructive-default opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            />
          </button>
          <button
            className='p-0.5'
            type='button'
            onClick={() => setIsNameEditing(true)}
          >
            <Icon
              type='edit'
              className='flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100'
            />
          </button>
        </>
      )}
    </div>
  );
};
