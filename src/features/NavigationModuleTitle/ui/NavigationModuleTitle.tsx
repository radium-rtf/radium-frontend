'use client';
import { Icon, Input, cn } from '@/shared';
import {
  FormEvent,
  HTMLAttributes,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CourseEditContext } from '@/features/CourseEditContext';
import {
  useDeleteCourseModuleMutation,
  useUpdateCourseModuleNameMutation,
} from '@/entities/CourseModule';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
  name: string;
  moduleId: string;
  isCurrentModule?: boolean;
}

export const NavigationModuleTitle = forwardRef<HTMLHeadingElement, IProps>(
  ({ className, name, moduleId, isCurrentModule = false, ...props }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { isEditing: isEditMode } = useContext(CourseEditContext);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteModule] = useDeleteCourseModuleMutation();
    const [updateName] = useUpdateCourseModuleNameMutation();

    // Сброс стейта при отключении редактирования
    useEffect(() => {
      if (!isEditMode && isEditing) {
        setIsEditing(false);
      }
    }, [isEditing, isEditMode]);

    // Создание обработчика Escape при редактировании названия
    useEffect(() => {
      const escapeHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsEditing(false);
        }
      };
      if (isEditing) {
        document.addEventListener('keydown', escapeHandler);
      }
      return () => {
        document.removeEventListener('keydown', escapeHandler);
      };
    }, [isEditing]);

    // Хендлер изменения имени модуля
    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      updateName({ id: moduleId, name: fd.get('newName') as string });
      setIsEditing(false);
    };

    // Хендлер удаления модуля
    const deleteHandler = () => {
      deleteModule(moduleId);
    };

    if (isEditing && isEditing) {
      return (
        <form ref={formRef} onSubmit={(e) => formSubmitHandler(e)} className='px-2 py-1.5'>
          <Input
            name='newName'
            placeholder='Глава'
            defaultValue={name}
            actionIcon='submit'
            onActionClick={() => formRef.current?.requestSubmit()}
          />
        </form>
      );
    }

    return (
      <div
        className={cn('group flex items-center gap-4 px-6 py-4', className)}
        ref={ref}
        {...props}
      >
        <h2
          className={cn(
            'flex-grow text-lg font-bold text-primary',
            isCurrentModule && 'text-accent'
          )}
        >
          {name}
        </h2>
        {isEditMode && (
          <>
            <button className='p-0.5' type='button' onClick={deleteHandler}>
              <Icon
                type='delete'
                className='flex-shrink-0 text-destructive opacity-0 transition-opacity duration-300 group-hover:opacity-100'
              />
            </button>
            <button className='p-0.5' type='button' onClick={() => setIsEditing(true)}>
              <Icon
                type='edit'
                className='flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100'
              />
            </button>
          </>
        )}
      </div>
    );
  }
);

NavigationModuleTitle.displayName = 'NavigationModuleTitle';
