import { Button, Card, Icon, Input } from '@/shared';
import { FC, useEffect, useState } from 'react';

interface CourseAddContactProps {}

export const CourseAddContact: FC<CourseAddContactProps> = ({}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    <div className='relative'>
      <button
        onClick={() => setIsFormOpen(true)}
        className='relative -mx-6 flex w-full items-center gap-4 px-6 py-2'
      >
        <Icon type='add' className='text-primary-default' />
        <span className='font-mono text-[0.8125rem] leading-tight'>
          Добавить контакт
        </span>
      </button>
      {isFormOpen && (
        <Card
          className='absolute -left-6 -right-6 top-16 bg-background-card'
          asChild
        >
          <form>
            <Input iconType='link' name='link' placeholder='Ссылка' />
            <Input iconType='link' name='name' placeholder='Название' />
            <Button color='accent'>
              <Icon type='save' className='text-secondary-foreground' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                Сохранить
              </span>
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};
