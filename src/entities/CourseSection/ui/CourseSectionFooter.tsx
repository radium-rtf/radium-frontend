'use client';

import { useFormContext } from 'react-hook-form';
import { AllSectionsResponseDto } from '../model/AllSectionsResponseDto';
import { Button, CardFooter, Icon, cn, getNoun } from '@/shared';
import { useLazyGetCourseQuestionAnswerQuery } from '../api/courseSectionApi';

type CourseSectionFooterProps<TFormState extends object> = {
  sectionData: AllSectionsResponseDto;
  resetObject?: TFormState;
  errorMessage?: string | null;
  isTask?: boolean;
  isQuestion?: boolean;
  onAnswer?: (answers: { Answer?: string; Answers?: string[] }) => void;
};

export const CourseSectionFooter = <TFormState extends object>({
  sectionData,
  resetObject,
  errorMessage,
  isTask,
  isQuestion,
  onAnswer,
}: CourseSectionFooterProps<TFormState>) => {
  const [getAnswer] = useLazyGetCourseQuestionAnswerQuery();
  const {
    reset,
    trigger,
    formState: { isSubmitting, isValid, isSubmitSuccessful, isSubmitted },
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
      {isQuestion && (
        <Button
          type='button'
          variant='outline'
          onClick={async () => {
            const answer = await getAnswer({ sectionId: sectionData.id });
            answer.data && onAnswer?.(answer.data);
            trigger();
          }}
        >
          <Icon type='wand' />
        </Button>
      )}
      <Button type='button' variant='outline' onClick={() => reset(resetObject)}>
        <Icon type='reset' />
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
          variant={!isValid && isSubmitted ? 'destructive' : 'default'}
        >
          <Icon type='send' className='text-inherit' />
          <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
            {(isSubmitting && 'Отправляем...') ||
              (!isValid && errorMessage) ||
              (isSubmitSuccessful && 'Верно!') ||
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
            isSubmitSuccessful
              ? 'default'
              : sectionData.verdict === 'WAIT'
                ? 'outline'
                : isValid
                  ? 'outline'
                  : 'default'
          }
        >
          <Icon type='send' className='text-inherit' />
          <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
            {(isSubmitting && 'Отправляем...') ||
              (!isValid && errorMessage) ||
              (isSubmitSuccessful && 'Отправлено!') ||
              (sectionData.verdict === 'WAIT' && 'Ждем оценки') ||
              'Отправить'}
          </span>
        </Button>
      )}
    </CardFooter>
  );
};
