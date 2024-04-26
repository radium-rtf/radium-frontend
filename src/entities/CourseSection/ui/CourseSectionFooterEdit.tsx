'use client';

import { FC, ReactNode } from 'react';
import { Button, CardFooter, Icon, Input } from '@/shared';
import { useFormContext } from 'react-hook-form';

interface CourseSectionFooterEditProps {
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  deleteButton?: ReactNode;
  errorMessage?: string | null;
  hasScore?: boolean;
}

export const CourseSectionFooterEdit: FC<CourseSectionFooterEditProps> = ({
  hasScore,
  deleteButton,
  isEditing,
  setIsEditing,
  errorMessage,
}) => {
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useFormContext();

  return (
    <CardFooter className='justify-end gap-4'>
      {hasScore && isEditing && (
        <>
          <Input
            placeholder='Лимит'
            {...register('maxAttempts', {
              valueAsNumber: true,
              onChange: () => {
                errors.root && clearErrors('root');
              },
            })}
            text='попыток'
          />
          <Input
            placeholder='Лимит'
            {...register('maxScore', {
              valueAsNumber: true,
              onChange: () => {
                errors.root && clearErrors('root');
              },
            })}
            text='баллов'
          />
        </>
      )}
      {deleteButton}
      {!isEditing && (
        <Button type='button' variant='outline' size='wide' onClick={() => setIsEditing(true)}>
          <Icon type='edit' className='shrink-0 text-inherit' />
          <span>Редактировать</span>
          <Icon type='blank' className='shrink-0 text-inherit' />
        </Button>
      )}
      {isEditing && (
        <Button
          type='submit'
          className='w-64 shrink-0 justify-start'
          variant={!isValid && isSubmitted && !isSubmitting ? 'destructive' : 'outline'}
          disabled={isSubmitting}
          onClick={() => setIsEditing(true)}
        >
          <Icon
            type={isSubmitting ? 'loading' : errorMessage ? 'alert' : 'save'}
            className='shrink-0 text-inherit'
          />
          <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
            {(isSubmitting && 'Сохраняем...') || (!isValid && errorMessage) || 'Сохранить'}
          </span>
        </Button>
      )}
    </CardFooter>
  );
};
