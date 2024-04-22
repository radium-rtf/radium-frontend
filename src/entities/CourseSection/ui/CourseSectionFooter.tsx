'use client';

import { useFormContext } from 'react-hook-form';
import { AllSectionsResponseDto } from '../model/AllSectionsResponseDto';
import { Button, CardFooter, Icon, cn, getNoun } from '@/shared';

type CourseSectionFooterProps<TFormState extends object> = {
  sectionData: AllSectionsResponseDto;
  resetObject?: TFormState;
  errorMessage?: string | null;
  isTask?: boolean;
};

export const CourseSectionFooter = <TFormState extends object>({
  sectionData,
  resetObject,
  errorMessage,
  isTask,
}: CourseSectionFooterProps<TFormState>) => {
  const {
    reset,

    formState: { isSubmitting, isValid, isSubmitSuccessful, isSubmitted, isDirty },
  } = useFormContext<TFormState>();
  return (
    <CardFooter
      className={cn('justify-end gap-4', 'review' in sectionData && !!sectionData.review && 'pb-4')}
    >
      {!isSubmitting && sectionData.maxAttempts > 0 && (
        <span
          className={cn(
            'text-[0.8125rem]',
            sectionData.maxAttempts && !sectionData.attempts && 'text-destructive'
          )}
        >
          {sectionData.verdict === '' &&
            `${sectionData.maxAttempts} ${getNoun(
              sectionData.maxAttempts,
              'попытка',
              'попытки',
              'попыток'
            )}`}
          {sectionData.verdict !== '' &&
            `Осталось ${sectionData.attempts} ${getNoun(
              sectionData.attempts,
              'попытка',
              'попытки',
              'попыток'
            )}`}
        </span>
      )}
      {!isSubmitting && sectionData.maxScore > 0 && (
        <span className={cn('text-[0.8125rem]', sectionData.verdict === 'OK' && 'text-accent')}>
          {sectionData.verdict === '' &&
            `${sectionData.maxScore} ${getNoun(sectionData.maxScore, 'балл', 'балла', 'баллов')}`}
          {sectionData.verdict !== '' && `${sectionData.score} / ${sectionData.maxScore} баллов`}
        </span>
      )}
      <Button type='button' variant='outline' onClick={() => reset(resetObject)}>
        <Icon type='undo' />
      </Button>
      {!isTask && (
        <Button
          disabled={
            (!isValid && !isSubmitted) ||
            isSubmitting ||
            (sectionData.attempts <= 0 && !!sectionData.maxAttempts)
          }
          type='submit'
          className='w-64 justify-start'
          variant={
            (!isValid && isSubmitted && 'destructive') ||
            (sectionData.verdict && !isSubmitSuccessful && 'outline') ||
            'default'
          }
        >
          <Icon
            type={
              (isSubmitting && 'loading') ||
              (isSubmitSuccessful && 'success') ||
              (errorMessage && 'alert') ||
              'submit'
            }
            className='text-inherit'
          />
          <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
            {(isSubmitting && 'Отвечаем...') ||
              (!isValid && errorMessage) ||
              (isSubmitSuccessful && 'Правильно!') ||
              'Ответить'}
          </span>
        </Button>
      )}
      {isTask && (
        <Button
          disabled={
            !isValid || isSubmitting || (sectionData.attempts <= 0 && !!sectionData.maxAttempts)
          }
          type='submit'
          className='w-64 justify-start'
          variant={
            (!isValid && isSubmitted && 'destructive') ||
            (sectionData.verdict === 'WAIT' && !isSubmitSuccessful && 'outline') ||
            'default'
          }
        >
          <Icon
            type={
              (isSubmitting && 'loading') ||
              (isSubmitSuccessful && 'success') ||
              (errorMessage && 'alert') ||
              (sectionData.verdict === 'WAIT' && !isDirty && 'timer') ||
              'send'
            }
            className='text-inherit'
          />
          <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
            {(isSubmitting && 'Отправляем...') ||
              (!isValid && errorMessage) ||
              (isSubmitSuccessful && 'Отправлено!') ||
              (sectionData.verdict === 'WAIT' && !isDirty && 'Ждем оценки') ||
              'Отправить'}
          </span>
        </Button>
      )}
    </CardFooter>
  );
};
