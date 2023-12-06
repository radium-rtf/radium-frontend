import {
  ButtonHTMLAttributes,
  FC,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { Icon, Input, cn } from '@/shared';
import { useCreateCoursePageMutation } from '@/entities/CoursePage';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  moduleId: string;
}

export const NavigationCreatePage: FC<IProps> = ({
  className,
  moduleId,
  ...props
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [createPage] = useCreateCoursePageMutation();

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

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createPage({ name: fd.get('newPage') as string, moduleId: moduleId });
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <form onSubmit={submitHandler} className='px-2 py-1.5'>
        <Input name='newPage' placeholder='Введите название модуля' />
      </form>
    );
  }

  return (
    <button
      {...props}
      className={cn(
        'flex w-full items-center gap-4 rounded-lg border border-transparent px-6 py-2 outline-none outline-1 -outline-offset-1 transition-colors hover:border-white/10 hover:bg-white/5 focus-visible:outline-white',
        className
      )}
      onClick={() => {
        setIsCreating((prev) => !prev);
      }}
    >
      <Icon type='add' className='text-primary-default' />
      <span className='text-[0.8125rem] text-text-primary'>
        Добавить страницу
      </span>
    </button>
  );
};
